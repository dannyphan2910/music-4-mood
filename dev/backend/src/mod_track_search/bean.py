import json
import requests

from mod_analyze_mood.Mood import Mood
from mod_analyze_mood.mood_analyzer import analyzer
from model.Track import Track, TrackMood
import urllib
import os


# SPOTIFY API

access_token = ''


def set_access_token(token):
    response = ({}, 404)

    global access_token
    if token is not None and token != '':
        access_token = token

    print(access_token)

    if access_token is not '' and access_token == token:
        result = {"success": True}
        response = (result, 200)
    else:
        result = {"success": False}
        response = (result, 400)

    return response


def get_tracks(lyrics='', stress='', energy='', limit=25):
    print('call get_tracks', lyrics, stress, energy, limit)
    response = ({}, 404)

    if lyrics is None or lyrics == '':
        print('invalid lyrics')
        response = ({}, 400)

    elif stress is None or (stress != '' and stress != Mood.HAPPY.describe() and stress != Mood.SAD.describe()) or energy is None or (energy != '' and energy != Mood.ENERGETIC.describe() and energy != Mood.CALM.describe()):
        print('invalid mood filters')
        response = ({}, 400)

    else:
        tracks = __get_track_list(__track_search_api(lyrics))
        tracks_json = []

        counter = limit
        for track in tracks:
            if counter == 0:
                break

            track_stress = track.mood.analyzer.stress_counter
            if stress != '' and track_stress != stress:
                continue

            track_energy = track.mood.analyzer.energy_counter
            if energy != '' and track_energy != energy:
                continue

            tracks_json.append(track.get())
            counter -= 1

        data = {
            'data': tracks_json
        }

        response = (data, 200)

    print(json.dumps(response[0], indent=4))

    return response


def __track_search_api(lyrics):
    search_track_base_url = 'https://api.spotify.com/v1/search?'
    search_track_url = search_track_base_url + 'q=track:' + urllib.parse.quote(lyrics) + '&type=track&offset=0&limit=40&' + access_token

    print(search_track_url)

    request = requests.get(search_track_url)
    data_dict = request.json()

    return data_dict


def __get_track_list(data_dict):
    tracks = []

    print(data_dict)

    if data_dict['tracks']['total'] <= 0:
        return tracks

    track_list = data_dict['tracks']['items']
    for item in track_list:
        title = item['name']
        album = item['album']['name']

        artist = ''
        for this_artist in item['artists']:
            artist += this_artist['name'] + ','
        artist = artist[:len(artist)-1]

        # 300 x 300
        artwork = item['album']['images'][1]['url']
        preview_url = item['preview_url']

        track = Track(title=title, album=album, artist=artist, artwork=artwork, preview_url=preview_url)
        get_mood_for_track(track=track, id=item['id'])
        get_lyrics_genre(track)

        tracks.append(track)

    return tracks


def get_mood_for_track(track, id):
    mood_result = get_mood(id)
    if mood_result is None:
        key = None
        valence = None
        bpm = None
        danceability = None
        energy = None
    else:
        key = mood_result[0]
        valence = mood_result[1]
        bpm = mood_result[2]
        danceability = mood_result[3]
        energy = mood_result[4]

    track_mood = TrackMood(bpm=bpm, key=key, valence=valence, danceability=danceability, energy=energy)

    analyze_mood = analyzer(track_mood)
    if analyze_mood is not None:
        track_mood.analyzer = analyze_mood

    track.mood = track_mood
    return track_mood


def get_mood(track_id):
    if access_token is None or access_token == '':
        return None

    if track_id is None or track_id == '':
        return None

    get_analysis_base_url = 'https://api.spotify.com/v1/audio-features/'
    get_analysis_url = get_analysis_base_url + track_id + '?' + access_token

    print(get_analysis_url)

    request = requests.get(get_analysis_url)
    data_dict = request.json()

    print(data_dict)

    key = data_dict['key']
    valence = data_dict['valence']
    bpm = data_dict['tempo']
    danceability = data_dict['danceability']
    energy = data_dict['energy']

    return key, valence, bpm, danceability, energy


# MUSICXMATCH API

def get_lyrics_genre(track):
    api_key = '&apikey=' + os.environ.get('API_KEY')
    base_url = 'https://api.musixmatch.com/ws/1.1/track.search?format=json&callback=callback'
    other_params = '&s_track_rating=desc&quorum_factor=1'

    search = '&q_track=' + urllib.parse.quote(track.title) + '&q_artist=' + urllib.parse.quote(track.artist)

    api_call = base_url + search + other_params + api_key

    request = requests.get(api_call)
    data_dict = request.json()

    if len(data_dict['message']['body']['track_list']) <= 0:
        return None

    track_info = data_dict['message']['body']['track_list'][0]['track']

    genre = None
    if track_info['primary_genres']['music_genre_list']:
        genre = track_info['primary_genres']['music_genre_list'][0]['music_genre']['music_genre_name']

    lyrics = None
    if track_info['has_lyrics'] == 1:
        lyrics = __get_lyrics(track_info['track_id'])

    track.genre = genre
    track.lyrics = lyrics

    return track


def __get_lyrics(track_id):
    api_key = '&apikey=' + os.environ.get('API_KEY')
    base_url = 'https://api.musixmatch.com/ws/1.1/track.lyrics.get?'
    track_id = 'track_id=' + str(track_id)

    api_call = base_url + track_id + api_key

    request = requests.get(api_call)
    data_dict = request.json()

    lyrics_body = data_dict['message']['body']['lyrics']['lyrics_body'].split('******* This Lyrics is NOT for Commercial use *******')[0]
    lyrics_copyright = data_dict['message']['body']['lyrics']['lyrics_copyright']
    lyrics_tracking = data_dict['message']['body']['lyrics']['pixel_tracking_url']

    lyrics = {
        'body': lyrics_body,
        'copyright': lyrics_copyright,
        'tracking': lyrics_tracking
    }

    return lyrics
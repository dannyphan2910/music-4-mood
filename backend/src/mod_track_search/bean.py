import json
import os
import requests
from model.Track import Track
from mod_track_mood.bean import *
import urllib


def get_tracks(lyrics=''):
    response = ({}, 404)

    if lyrics is None:
        response = ({}, 400)

    else:
        tracks = __get_track_list(__track_search_api(lyrics))
        tracks_json = []
        for track in tracks:
            tracks_json.append(track.get())

        data = {
            'data': tracks_json
        }

        response = (data, 200)

    return response


def __track_search_api(lyrics):
    api_key = '&apikey=' + os.environ.get('API_KEY')
    base_url = 'https://api.musixmatch.com/ws/1.1/track.search?format=json&callback=callback'
    other_params = '&s_track_rating=desc&quorum_factor=1'

    search = '&q_lyrics=' + urllib.parse.quote(lyrics)

    api_call = base_url + search + other_params + api_key
    # print(api_call)

    request = requests.get(api_call)
    data_dict = request.json()
    return data_dict


def __get_track_list(data_dict):
    tracks = []
    track_list = data_dict['message']['body']['track_list']
    for item in track_list:
        one_track = item['track']
        album = one_track['album_name']
        artist = one_track['artist_name']
        track_name = one_track['track_name']
        genre = None

        if one_track['primary_genres']['music_genre_list']:
            genre = one_track['primary_genres']['music_genre_list'][0]['music_genre']['music_genre_name']

        lyrics = None
        if one_track['has_lyrics'] == 1:
            lyrics = __get_lyrics(one_track['track_id'])

        track = Track(track_name, genre, artist, album, lyrics=lyrics)

        get_mood_for_track(track)

        tracks.append(track)

    return tracks


# def __get_artwork_preview_for_all(tracks):
#     for track in tracks:
#         __get_artwork_preview(track)


def __get_artwork_preview(track):
    url = 'https://api.deezer.com/search/track?q=' + urllib.parse.quote(track.title)
    print(url)
    request = requests.get(url)
    data_dict = request.json()

    if data_dict['total'] > 0:
        artwork = data_dict['data'][0]['album']['cover_big']
        preview_url = data_dict['data'][0]['preview']

        track.artwork = artwork
        track.preview_url = preview_url

    return track


def __get_lyrics(track_id):
    api_key = '&apikey=' + os.environ.get('API_KEY')
    base_url = 'https://api.musixmatch.com/ws/1.1/track.lyrics.get?'
    track_id = 'track_id=' + str(track_id)

    api_call = base_url + track_id + api_key
    # print(api_call)

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




import urllib

import requests
from difflib import SequenceMatcher

from model.TrackMood import TrackMood

access_token = ''


def set_access_token(token):
    global access_token
    if token is not None and token is not '':
        access_token = token


def get_mood_for_track(track):
    mood_result = get_mood(track.title)
    if mood_result is None:
        key = None
        valence = None
        bpm = None
    else:
        key = mood_result[0]
        valence = mood_result[1]
        bpm = mood_result[2]

    track_mood = TrackMood(bpm=bpm, key=key, valence=valence)

    track.mood = track_mood
    return track_mood


def get_mood(track_name):
    if access_token is None or access_token is '':
        return None

    track_id = get_track_id(track_name)

    if track_id is None or track_id is '':
        return None

    get_analysis_base_url = 'https://api.spotify.com/v1/audio-features/'
    get_analysis_url = get_analysis_base_url + track_id + '?access_token=' + access_token

    print(get_analysis_url)

    request = requests.get(get_analysis_url)
    data_dict = request.json()

    print(data_dict)

    key = data_dict['key']
    valence = data_dict['valence']
    bpm = data_dict['tempo']

    return key, valence, bpm


def get_track_id(track_name):
    global access_token

    search_track_base_url = 'https://api.spotify.com/v1/search?'
    search_track_url = search_track_base_url + 'q=track:' + urllib.parse.quote(track_name) + '&type=track' + '&access_token=' + access_token

    request = requests.get(search_track_url)
    data_dict = request.json()
    items_result = data_dict['tracks']['items']

    print(search_track_url)

    found_track = None

    for item in items_result:
        if item['type'] == 'track' and similar(item['name'], track_name) > 0.95:
            found_track = item
            break

    spotify_id = None
    if found_track is not None:
        spotify_id = found_track['id']

    return spotify_id


def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()

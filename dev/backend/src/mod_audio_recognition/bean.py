import json
import tempfile

from acrcloud.recognizer import ACRCloudRecognizeType
from acrcloud.recognizer import ACRCloudRecognizer
from mod_track_search.bean import get_track_id
from model.Track import Track


def get_tracks_from_audio(file):
    response = ({}, 404)

    if file is None or file == '':
        print('invalid audio file')
        response = ({}, 400)

    else:
        config = {
            'host': 'identify-us-west-2.acrcloud.com',
            'access_key': os.environ.get('ACCESS_KEY'),
            'access_secret': os.environ.get('ACCESS_SECRET'),
            'recognize_type': ACRCloudRecognizeType.ACR_OPT_REC_BOTH,
            'debug': False,
            'timeout': 10  # seconds
        }

        '''This module can recognize ACRCloud by most of audio/video file.
            Audio: mp3, wav, m4a, flac, aac, amr, ape, ogg ...
            Video: mp4, mkv, wmv, flv, ts, avi ...'''

        recognizer = ACRCloudRecognizer(config)

        f = tempfile.NamedTemporaryFile()
        f.write(file.read())

        duration = ACRCloudRecognizer.get_duration_ms_by_file(str(f.name))
        print("duration_ms=" + str(duration))

        if duration // 1000 > 10:
            max_duration = max(10, (duration * 20 // 100) // 1000)
        else:
            max_duration = 10

        result = json.loads(recognizer.recognize_by_file(str(f.name), 0, max_duration))
        print(result)

        f.close()

        tracks = process_metadata(result)

        data = {
            'data': tracks
        }

        response = (data, 200)

        print(json.dumps(response[0], indent=4))

    return response


def process_metadata(result):
    tracks = []
    if result['status']['msg'] == "Success":
        tracks_dict = result['metadata']['music']
        for item in tracks_dict:
            if 'spotify' in item['external_metadata']:
                track = get_track_id(item['external_metadata']['spotify']['track']['id'])

            if track is None:
                artist = ''
                for this_artist in item['artists']:
                    artist += this_artist['name'] + ','
                artist = artist[:len(artist) - 1]
                track = Track(item['title'], artist, item['album']['name'])

            track_to_append = {
                'track': track.get(),
                'score': item['score']
            }

            tracks.append(track_to_append)
    return tracks








                    
                







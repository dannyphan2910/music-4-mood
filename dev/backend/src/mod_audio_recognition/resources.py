from flask_restful import Resource
from flask import request
from mod_audio_recognition.parser import *
from mod_audio_recognition.bean import *


class Audio(Resource):
    def post(self):
        args = audio_reqparse.parse_args(request)
        file = args.get('file', None)
        print(file[0])
        return get_tracks_from_audio(file[0])


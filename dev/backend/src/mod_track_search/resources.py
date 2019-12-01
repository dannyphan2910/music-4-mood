from flask import request

from mod_track_search.parser import *
from mod_track_search.bean import *

from flask_restful import Resource


class TrackList(Resource):

    def get(self, lyrics):
        tracks = get_tracks(lyrics)
        return tracks


class Token(Resource):

    def post(self):
        args = parser.parse_args(request)
        a_token = args.get('token', '')
        print('received: ' + a_token)
        return set_access_token(a_token)

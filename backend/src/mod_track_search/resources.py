from mod_track_search import bean

from mod_track_search.parser import *
from mod_track_search.bean import *

from flask_restful import Resource

class TrackList(Resource):

    def get(self, lyrics):
        tracks = bean.get_tracks(lyrics)
        return tracks

class Token(Resource):

    def post(self):
        args = parser.parse_args()
        a_token = args.get('token', '')
        print(a_token)
        return set_access_token(a_token)

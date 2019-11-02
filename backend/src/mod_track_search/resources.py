from flask_restful import Resource, Api
from mod_track_search import bean
from flask_jsonpify import jsonify


class TrackList(Resource):

    def get(self, lyrics):
        tracks = bean.get_tracks(lyrics)
        return tracks

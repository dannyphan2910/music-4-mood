from flask_restful import Resource
from mod_track_mood.bean import *


class MoodGetter(Resource):

    def post(self, token):
        set_access_token(token)



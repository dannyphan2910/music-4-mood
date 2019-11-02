from urllib import request

from flask_restful import Resource
from mod_track_mood.bean import *
from mod_track_mood.parser import *


class Token(Resource):

    def post(self):
        args = parser.parse_args()
        a_token = args.get('token', '')

        return set_access_token(a_token)



from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify

from mod_track_search.resources import *

app = Flask(__name__)
api = Api(app)

CORS(app)


@app.route("/")
def hello():
    return 'API END-POINT'


api.add_resource(TrackList, '/get_tracks/<string:lyrics>')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4002, debug=True)


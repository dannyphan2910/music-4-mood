from flask import Flask, send_from_directory
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify

from mod_track_search.resources import *

app = Flask(__name__)
api = Api(app)

CORS(app)


@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory('./', path)


@app.route("/")
def root():
    return "hello" #send_from_directory('./', 'index.html')


api.add_resource(TrackList, '/get_tracks/<string:lyrics>')
api.add_resource(Token, '/set_token')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4002, debug=True)


from werkzeug.datastructures import FileStorage
from extensions import reqparse

audio_reqparse = reqparse.RequestParser()
audio_reqparse.add_argument('file', type=FileStorage, required=True, location='files', action='append', default=None)
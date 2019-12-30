from extensions import reqparse

get_track_parser = reqparse.RequestParser()
get_track_parser.add_argument(name='lyrics', type=str, required=True, default='')
get_track_parser.add_argument(name='stress', type=str, required=True, default='')
get_track_parser.add_argument(name='energy', type=str, required=True, default='')
get_track_parser.add_argument(name='limit', type=int, default=25)

parser = reqparse.RequestParser()
parser.add_argument('token', type=str, default='', location='json')

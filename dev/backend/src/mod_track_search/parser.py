from extensions import reqparse

parser = reqparse.RequestParser()
parser.add_argument('token', type=str, default='', location='json')

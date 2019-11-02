from mod_track_search.bean import *
from mod_track_mood.bean import *


access_token_test = 'ACCESS_TOKEN'
set_access_token(access_token_test)

lyrics = input("Enter lyrics: ")

tracksList = get_tracks(lyrics)[0]

print(json.dumps(tracksList, indent=4))









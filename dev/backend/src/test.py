from mod_track_search.bean import *

access_token_test = ''
set_access_token(access_token_test)

lyrics = input("Enter lyrics: ")

tracksList = get_tracks(lyrics, 'happy', 'calm', 10)[0]









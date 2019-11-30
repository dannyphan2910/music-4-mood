from mod_track_search.bean import *
from mod_track_mood.bean import *


access_token_test = 'access_token=BQBUV8UsoYSPnGGtDZOe6IXvG3WfhatynlYzlZnhvGLJeUVCCGAX1mrtT8UhbGqOhek75KjlHW5pAN6dHSSnhiA7yQox6Db68U2sWftLm--8Os0VRI06NfByTe3DRkoj3l7n31MBvz1dhq-AyIAtsLDzrbkcU7APWgg789D3-GRxiTjI0iGBRt69g6E&refresh_token=AQAMoDm0W9nqj1BMORMfFaxHjlU8_61W1pUQsKfsVonwTFOdxz2ifC9mq6rXKKixtaSC1ahp5G2FQEF5Wvf6sRTH52mz66qu330bCXkdjZQ4rwsC4vOy3tWYwERemsbu8tU'

set_access_token(access_token_test)

lyrics = input("Enter lyrics: ")

tracksList = get_tracks(lyrics)[0]









from model.TrackMood import TrackMood


class Track:
    def __init__(self, title, artist, album, genre=None, lyrics=None, artwork=None, preview_url=None, mood=None):
        self.title = title
        self.genre = genre
        self.artist = artist
        self.album = album
        self.lyrics = lyrics
        self.artwork = artwork
        self.preview_url = preview_url
        self.mood = TrackMood()

    def get(self):
        data = {
            'title': self.title,
            'genre': self.genre,
            'artist': self.artist,
            'album': self.album
        }

        if self.lyrics is not None:
            data['lyrics'] = self.lyrics

        if self.artwork is not None:
            data['artwork'] = self.artwork

        if self.preview_url is not None:
            data['preview_url'] = self.preview_url

        if self.mood is not None:
            data['mood'] = self.mood.get()

        return data

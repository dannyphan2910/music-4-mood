class TrackMood:
    def __init__(self, bpm=None, key=None, valence=None):
        self.bpm = bpm
        self.key = key
        self.valence = valence

    def get(self):
        data = {}

        if self.bpm is not None:
            data['bpm'] = self.bpm

        if self.key is not None:
            data['key'] = self.key

        if self.valence is not None:
            data['valence'] = self.valence

        return data


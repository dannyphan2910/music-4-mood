class TrackMood:
    def __init__(self, bpm=None, key=None, valence=None, danceability=None, energy=None, analyzer=None):
        self.bpm = bpm
        self.key = key
        self.valence = valence
        self.danceability = danceability
        self.energy = energy
        self.analyzer = analyzer

    def get(self):
        data = {}

        if self.bpm is not None:
            data['bpm'] = self.bpm

        if self.key is not None:
            data['key'] = self.key

        if self.valence is not None:
            data['valence'] = self.valence

        if self.danceability is not None:
            data['danceability'] = self.danceability

        if self.energy is not None:
            data['energy'] = self.energy

        if self.analyzer is not None:
            data['analyzer'] = self.analyzer.get()

        return data


class Analyzer:
    def __init__(self, stress_counter, energy_counter):
        self.stress_counter = stress_counter
        self.energy_counter = energy_counter

    def get(self):
        data = {
            'stress_counter': self.stress_counter,
            'energy_counter': self.energy_counter
        }

        return data



from mod_analyze_mood.Mood import Mood
from model.TrackMood import Analyzer


def analyzer(track_mood):
    if track_mood is None:
        return None

    if track_mood.key is None or track_mood.key == -1 or \
            track_mood.bpm is None or \
            track_mood.valence is None or track_mood.valence == -1 or \
            track_mood.danceability is None or track_mood.danceability == -1 or \
            track_mood.energy is None or track_mood.energy == -1:
        return None

    key = track_mood.key
    bpm = track_mood.bpm
    valence = track_mood.valence
    danceability = track_mood.danceability
    energy = track_mood.energy

    stress_counter = valence + key / 12 + bpm / 100
    energy_counter = danceability + energy + bpm / 100

    if stress_counter > 2:
        stress_result = Mood.HAPPY.describe()
    else:
        stress_result = Mood.SAD.describe()

    if energy_counter > 2.5:
        energy_result = Mood.ENERGETIC.describe()
    else:
        energy_result = Mood.CALM.describe()

    return Analyzer(stress_result, energy_result)

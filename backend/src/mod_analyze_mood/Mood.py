from enum import Enum


class Mood(Enum):
    HAPPY = 'happy'
    SAD = 'sad'
    ENERGETIC = 'energetic'
    CALM = 'calm'

    def describe(self):
        return self.value

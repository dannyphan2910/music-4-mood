# music-4-mood (previously music-lyrics)

a web application for users to get track suggestions based on lyrics/keywords, with each song corresponding to a predicted 'mood'.

current mood algorithm analyzes each track's audio features (BPM, key, valence, etc.) from Spotify API and estimates whether the track is a HAPPY or SAD track, and whether it is an ENERGETIC or CALM song (denoted by icons). while categorizing songs by mood is still a developing field, I try my best to be as accurate in predicting the moods as possible. my future goal in this area of the application is to research more into music theory and devise a more complex algorithm based on Thayer’s mood model (https://sites.tufts.edu/eeseniordesignhandbook/2015/music-mood-classification/)

this github maintains the 'development' code of the website, including the front-end (with Angular) and the back-end (with Python Flask). 

for live version of the web application, visit: https://music-4-mood.herokuapp.com/

this is a project i worked hard on, and have had the chance to strengthen my web development skills, which I aim to improve even more through more projects and work opportunities. future improvements include: even better UI (i aim to create a simple and calming user interface), and better mood prediction algorithm.

**UPDATE: Added a feature where users can curate the tracks based on their mood (either HAPPY or SAD and either ENERGETIC or CALM, and it's ok not to know because they can still choose to get all the suitable tracks!)


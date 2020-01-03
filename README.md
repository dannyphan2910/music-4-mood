# MUSIC 4 MOOD (previously MusicLyrics)

**For live version of the web application, visit: https://music-4-mood.herokuapp.com/**

A web application for users to get track suggestions based on lyrics/keywords, with each song corresponding to a predicted 'mood'. 

**UPDATE: Added a feature where users can curate the tracks based on their mood (either HAPPY or SAD and either ENERGETIC or CALM, and it's ok not to know because they can still choose to get all the suitable tracks!)

**UPDATE: Added a feature similar to Shazam where users get track(s) suggested from recording a part of the track (or their singing!). Using ACRCloud API for Audio Recognition. I got to re-visit POST method with File and learned about .so file. 

Current mood algorithm analyzes each track's audio features (BPM, key, valence, etc.) from *Spotify API* and estimates whether the track is a HAPPY or SAD track, and whether it is an ENERGETIC or CALM song (denoted by icons). While categorizing songs by mood is still a developing field, I try my best to be as accurate in predicting the moods as possible. My future goal in this area of the application is to research more into music theory and devise a more complex algorithm based on Thayer’s mood model (https://sites.tufts.edu/eeseniordesignhandbook/2015/music-mood-classification/)

This github maintains the 'development' code of the website, including the front-end (with Angular) and the back-end (with Python Flask). 

This is a project i worked hard on, and have had the chance to strengthen my web development skills, which I aim to improve even more through more projects and work opportunities. Future improvements include: even better UI (I aim to create a simple and calming user interface), and better mood prediction algorithm.





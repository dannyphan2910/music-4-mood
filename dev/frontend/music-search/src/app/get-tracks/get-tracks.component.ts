import { testData } from './test';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GetTracksService } from '../get-tracks.service';
import { LyricsDialogComponent } from '../lyrics-dialog/lyrics-dialog.component';
import { MdcDialog } from '@angular-mdc/web';
import { MoodDialogComponent } from '../mood-dialog/mood-dialog.component';

@Component({
  selector: 'app-get-tracks',
  templateUrl: './get-tracks.component.html',
  styleUrls: ['./get-tracks.component.scss']
})
export class GetTracksComponent implements OnInit {
  searchForm;

  userInput: string = null;

  tracks: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private getTracksService: GetTracksService,
    private dialogLyrics: MdcDialog,
    private dialogAudio: MdcDialog
  ) {
    this.searchForm = this.formBuilder.group({
      lyrics: '',
    });
    // this.tracks = testData['data'];
  }

  ngOnInit() {
  }

  onSubmit(formData) {
    const lyrics = JSON.stringify(formData['lyrics']);
    this.userInput = lyrics;
    this.getTracksService.getTracks(lyrics.substring(1, lyrics.length - 1)).subscribe((data) => {
      console.log(data);
      this.tracks = data['data'];
    });
    this.searchForm.reset();
  }

  reset() {
    this.tracks = [];
  }

  displayLyrics(track) {
    const data = (track.lyrics == null || track.lyrics.body === '') ? 'Sorry, the lyrics is not available...' : track.lyrics;
    console.log('Lyrics for ' + track.title, data);

    const dialogRef = this.dialogLyrics.open(LyricsDialogComponent, {
      clickOutsideToClose: true,
      escapeToClose: true,
      data: {
        lyrics: data,
        track_info: track,
      }
    });
  }

  displayAudioFeatures(track) {
    if (track.mood != null) {
      const data = track.mood;
      console.log('Audio features for ' + track.mood, data);

      const dialogRef = this.dialogAudio.open(MoodDialogComponent, {
        clickOutsideToClose: true,
        escapeToClose: true,
        data: {
          mood: data,
          track_info: track,
        }
      });
    }
  }

}

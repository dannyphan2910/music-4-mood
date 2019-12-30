import { FilterDialogComponent } from './../filter-dialog/filter-dialog.component';
import { testData } from './test';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetTracksService } from '../get-tracks.service';
import { LyricsDialogComponent } from '../lyrics-dialog/lyrics-dialog.component';
import { MdcDialog, MdcDialogRef } from '@angular-mdc/web';
import { MoodDialogComponent } from '../mood-dialog/mood-dialog.component';

@Component({
  selector: 'app-get-tracks',
  templateUrl: './get-tracks.component.html',
  styleUrls: ['./get-tracks.component.scss']
})
export class GetTracksComponent implements OnInit {
  searchForm: FormGroup;

  name: string = '';

  userInput: string = null;

  isLoading = false;
  isSuccess = false;

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
    this.getTracksService.getToken();
    // this.tracks = testData['data'];
  }

  ngOnInit() {
    this.displayMoodFilter();
  }

  onSubmit(formData) {
    const lyrics = JSON.stringify(formData['lyrics']);
    this.userInput = lyrics;
    this.isSuccess = false;
    this.isLoading = true;
    this.resetTrack();
    this.getTracksService.getTracks(lyrics.substring(1, lyrics.length - 1)).subscribe((data) => {
      console.log('logged', data);
      this.isLoading = false;
      this.tracks = data['data'];
      this.resetForm();
      this.isSuccess = true;
    });
  }

  resetTrack() {
    this.tracks = [];
  }

  resetForm() {
    this.searchForm.reset();
  }

  displayLyrics(track) {
    const data = (track.lyrics == null || track.lyrics.body === '') ? 'Sorry, the lyrics is not available...' : track.lyrics;
    console.log('Lyrics for ' + track.title, data);

    this.dialogLyrics.open(LyricsDialogComponent, {
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

      this.dialogAudio.open(MoodDialogComponent, {
        clickOutsideToClose: true,
        escapeToClose: true,
        data: {
          mood: data,
          track_info: track,
        }
      });
    }
  }

  displayMoodFilter() {
    this.dialogAudio.open(FilterDialogComponent, {
      clickOutsideToClose: false,
      escapeToClose: true,
      data: {'ask_name': this.name === ''},
    }).afterClosed().subscribe(result => {
      console.log(result);
      if (result !== 'close') {
        if (result['name'] !== '') {
          this.name = result['name'];
        }
        if (result['lyrics'] !== '') {
          this.isSuccess = false;
          this.isLoading = true;
          this.resetTrack();
          this.getTracksService.getTracks(result['lyrics'], result['stress'], result['energy']).subscribe((data) => {
            console.log('logged', data);
            this.isLoading = false;
            this.tracks = data['data'];
            this.resetForm();
            this.isSuccess = true;
          });
        }
      }
    });
  }
}

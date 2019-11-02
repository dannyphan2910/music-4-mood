import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GetTracksService } from '../get-tracks.service';
// import { PlyrComponent } from 'ngx-plyr';
// import Plyr from 'plyr';
import { LyricsDialogComponent } from '../lyrics-dialog/lyrics-dialog.component';
import { MdcDialog } from '@angular-mdc/web';

@Component({
  selector: 'app-get-tracks',
  templateUrl: './get-tracks.component.html',
  styleUrls: ['./get-tracks.component.scss']
})
export class GetTracksComponent implements OnInit {
  searchForm;

  userInput: string = null;

  // player: Plyr;

  // audioSources: Plyr.Source[] = [
  //   {
  //     src: 'bTqVqk7FSmY',
  //     provider: 'audio/mp3',
  //   },
  // ];

  tracks: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private getTracksService: GetTracksService,
    private dialog: MdcDialog
  ) {
    this.searchForm = this.formBuilder.group({
      lyrics: '',
    });
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

  // played(event: Plyr.PlyrEvent) {
  //   console.log('played', event);
  // }

  // play(): void {
  //   this.player.play();
  // }

  displayLyrics(track) {
    const data = (track.lyrics == null) ? 'Sorry, the lyrics is not available...' : track.lyrics;
    console.log('Lyrics for ' + track.title, data);

    const dialogRef = this.dialog.open(LyricsDialogComponent, {
      clickOutsideToClose: true,
      escapeToClose: true,
      data: {lyrics: data}
    });
  }

}

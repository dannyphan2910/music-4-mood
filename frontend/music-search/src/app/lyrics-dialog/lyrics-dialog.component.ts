import { Component, OnInit, Inject } from '@angular/core';
import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web';
import { isString } from 'util';

@Component({
  selector: 'app-lyrics-dialog',
  templateUrl: './lyrics-dialog.component.html',
  styleUrls: ['./lyrics-dialog.component.scss']
})
export class LyricsDialogComponent implements OnInit {
  lyrics;
  notAvailable = true;

  constructor(
    private dialogRef: MdcDialogRef<LyricsDialogComponent>,
    @Inject(MDC_DIALOG_DATA) private data
  ) {
    this.lyrics = data.lyrics;
    if (!isString(this.lyrics)) {
      this.notAvailable = false;
    }
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}

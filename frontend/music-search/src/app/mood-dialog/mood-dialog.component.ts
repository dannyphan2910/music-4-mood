import { Component, OnInit, Inject } from '@angular/core';
import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web';
import { isString } from 'util';

@Component({
  selector: 'app-mood-dialog',
  templateUrl: './mood-dialog.component.html',
  styleUrls: ['./mood-dialog.component.scss']
})
export class MoodDialogComponent implements OnInit {
  mood;
  track;
  notAvailable = true;

  constructor(
    private dialogRef: MdcDialogRef<MoodDialogComponent>,
    @Inject(MDC_DIALOG_DATA) private data
  ) {
    this.mood = data.mood;
    this.track = data.track_info;
    if (!isString(this.mood)) {
      this.notAvailable = false;
    }
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}

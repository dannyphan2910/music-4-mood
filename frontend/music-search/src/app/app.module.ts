import { GetAuthComponent } from './auth/get-auth/get-auth.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetTracksComponent } from './get-tracks/get-tracks.component';

import { MdcTextFieldModule, MdcButtonModule, MdcCardModule, MdcListModule, MdcDialogModule } from '@angular-mdc/web';

import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { PlyrModule } from 'ngx-plyr';
import { LyricsDialogComponent } from './lyrics-dialog/lyrics-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    GetTracksComponent,
    LyricsDialogComponent,
    GetAuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MdcTextFieldModule,
    MdcButtonModule,
    MdcCardModule,
    MdcListModule,
    MdcDialogModule,
    NgxAudioPlayerModule,
    PlyrModule
  ],
  entryComponents: [
    LyricsDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

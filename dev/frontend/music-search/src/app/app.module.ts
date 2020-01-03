import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GetTracksLyricsModule } from './get-tracks-lyrics/get-tracks-lyrics.module';
import { GetTracksAudioModule } from './get-tracks-audio/get-tracks-audio.module';
import { GetTracksHomeModule } from './get-tracks-home/get-tracks-home.module';

import { MdcTextFieldModule, MdcButtonModule, MdcCardModule,
  MdcListModule, MdcDialogModule, MdcTypographyModule, MdcTabBarModule, MdcIconModule } from '@angular-mdc/web';

import { MoodDialogComponent } from './mood-dialog/mood-dialog.component';
import { LyricsDialogComponent } from './lyrics-dialog/lyrics-dialog.component';
import { FilterDialogComponent } from './get-tracks-lyrics/filter-dialog/filter-dialog.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LyricsDialogComponent,
    MoodDialogComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MdcTextFieldModule,
    MdcButtonModule,
    MdcCardModule,
    MdcListModule,
    MdcDialogModule,
    MdcTypographyModule,
    MdcTabBarModule,
    MdcIconModule,

    GetTracksAudioModule,
    GetTracksLyricsModule,
    GetTracksHomeModule
  ],
  entryComponents: [
    LyricsDialogComponent,
    MoodDialogComponent,
    FilterDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

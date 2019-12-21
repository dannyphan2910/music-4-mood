import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetTracksComponent } from './get-tracks/get-tracks.component';

import { MdcTextFieldModule, MdcButtonModule, MdcCardModule, MdcListModule, MdcDialogModule, MdcTypographyModule } from '@angular-mdc/web';

import { LyricsDialogComponent } from './lyrics-dialog/lyrics-dialog.component';
import { MoodDialogComponent } from './mood-dialog/mood-dialog.component';
import { LoadingComponent } from './loading/loading.component';
import { ScrollDownComponent } from './scroll-down/scroll-down.component';

@NgModule({
  declarations: [
    AppComponent,
    GetTracksComponent,
    LyricsDialogComponent,
    MoodDialogComponent,
    LoadingComponent,
    ScrollDownComponent,
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
    MdcTypographyModule,
  ],
  entryComponents: [
    LyricsDialogComponent,
    MoodDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

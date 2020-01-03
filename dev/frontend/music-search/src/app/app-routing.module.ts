import { GetTracksComponent } from './get-tracks-lyrics/get-tracks/get-tracks.component';
import { HomeComponent } from './get-tracks-home/home/home.component';
import { RecordAudioComponent } from './get-tracks-audio/record-audio/record-audio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'bylyrics', component: GetTracksComponent},
  { path: 'byaudio', component: RecordAudioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

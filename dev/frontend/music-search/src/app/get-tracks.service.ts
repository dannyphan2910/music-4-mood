import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, interval, Subscription } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetTracksService {
  base_url = 'https://music-4-mood.herokuapp.com/';
  subscription: Subscription;

  constructor(
    private http: HttpClient
  ) { }

  getTracks(lyrics: string, stress: string = '', energy: string = '', limit: number = 25) {
    const url = this.base_url + 'get_tracks?lyrics=' + lyrics + '&stress=' + stress + '&energy=' + energy + '&limit=' + limit;
    console.log(lyrics);
    return this.http.get(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getToken() {
    const params = ('grant_type=client_credentials');
    const clientId = 'CLIENT_ID'; // Your client id
    const clientSecret = 'CLIENT_SECRET'; // Your secret
    const encoded = btoa(clientId + ':' + clientSecret);
    const setHeaders = {
      'Authorization': 'Basic ' + encoded,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const uurl = 'https://accounts.spotify.com/api/token';

    return this.http.post(proxy + uurl, params, { headers: setHeaders }).subscribe(data => {
      const accessToken = 'access_token=' + data['access_token'];
      const token = accessToken;
      console.log(token);
      this.setTokenBackend(token);
    });
  }

  setTokenBackend(token) {
    const url = this.base_url + 'set_token';
    const toSend = {
      'token': token
    };
    return this.http.post(url, toSend).subscribe(result => console.log(result));
  }

  getTracksByAudio(file) {
    const url = this.base_url + 'get_tracks_audio';

    const formData = new FormData();
    formData.append('file', file, file.name);

    console.log(formData);

    return this.http.post(url, formData).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetTracksService {

  constructor(
    private http: HttpClient
  ) { }

  getTracks(lyrics: string) {
    const url = 'https://music-4-mood.herokuapp.com/get_tracks/' + lyrics;
    console.log(lyrics);
    return this.http.get(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getToken() {
    const params = ('grant_type=client_credentials');
    const clientId = 'e443d660cb984da1aa88a1780cc5a5e1'; // Your client id
    const clientSecret = '35413573f7aa459295e818970ad2755d'; // Your secret
    const encoded = btoa(clientId + ':' + clientSecret);
    const setHeaders = {
      'Authorization': 'Basic ' + encoded,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const uurl = 'https://accounts.spotify.com/api/token';

    return this.http.post(proxy + uurl, params, { headers: setHeaders }).subscribe(data => {
      const accessToken = 'access_token=' + data['access_token'];
      const refreshToken = 'refresh_token=' + data['refresh_token'];
      const token = accessToken + '&' + refreshToken;
      console.log(token);
      this.setTokenBackend(token);
    });
  }

  setTokenBackend(token) {
    const url = 'https://music-4-mood.herokuapp.com/set_token';
    const toSend = {
      'token': token
    };
    return this.http.post(url, toSend).subscribe(result => console.log(result));
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

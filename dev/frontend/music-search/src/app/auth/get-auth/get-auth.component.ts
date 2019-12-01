import { Component, OnInit } from '@angular/core';
import { GetTracksService } from 'src/app/get-tracks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-auth',
  templateUrl: './get-auth.component.html',
  styleUrls: ['./get-auth.component.scss']
})
export class GetAuthComponent implements OnInit {

  constructor(
    private getTracksService: GetTracksService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  getToken() {
    this.getTracksService.getToken();
    this.router.navigate(['/home']);
  }

}

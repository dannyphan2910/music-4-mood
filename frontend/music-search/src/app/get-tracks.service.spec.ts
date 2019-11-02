import { TestBed } from '@angular/core/testing';

import { GetTracksService } from './get-tracks.service';

describe('GetTracksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetTracksService = TestBed.get(GetTracksService);
    expect(service).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTracksComponent } from './get-tracks.component';

describe('GetTracksComponent', () => {
  let component: GetTracksComponent;
  let fixture: ComponentFixture<GetTracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetTracksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

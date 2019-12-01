import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodDialogComponent } from './mood-dialog.component';

describe('MoodDialogComponent', () => {
  let component: MoodDialogComponent;
  let fixture: ComponentFixture<MoodDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

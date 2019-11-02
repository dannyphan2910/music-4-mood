import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAuthComponent } from './get-auth.component';

describe('GetAuthComponent', () => {
  let component: GetAuthComponent;
  let fixture: ComponentFixture<GetAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

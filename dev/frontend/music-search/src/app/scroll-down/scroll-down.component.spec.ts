import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollDownComponent } from './scroll-down.component';

describe('ScrollDownComponent', () => {
  let component: ScrollDownComponent;
  let fixture: ComponentFixture<ScrollDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

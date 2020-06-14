import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntaryCIComponent } from './voluntary-ci.component';

describe('VoluntaryCIComponent', () => {
  let component: VoluntaryCIComponent;
  let fixture: ComponentFixture<VoluntaryCIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoluntaryCIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoluntaryCIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

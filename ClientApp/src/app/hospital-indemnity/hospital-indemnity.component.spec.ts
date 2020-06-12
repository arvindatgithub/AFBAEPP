import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalIndemnityComponent } from './hospital-indemnity.component';

describe('HospitalIndemnityComponent', () => {
  let component: HospitalIndemnityComponent;
  let fixture: ComponentFixture<HospitalIndemnityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalIndemnityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalIndemnityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

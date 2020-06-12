import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerPaidCIComponent } from './employer-paid-ci.component';

describe('EmployerPaidCIComponent', () => {
  let component: EmployerPaidCIComponent;
  let fixture: ComponentFixture<EmployerPaidCIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerPaidCIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerPaidCIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

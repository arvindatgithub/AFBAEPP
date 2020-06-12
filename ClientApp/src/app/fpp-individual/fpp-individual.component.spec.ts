import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FPPIndividualComponent } from './fpp-individual.component';

describe('FPPIndividualComponent', () => {
  let component: FPPIndividualComponent;
  let fixture: ComponentFixture<FPPIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FPPIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FPPIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

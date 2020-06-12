import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FPPGComponent } from './fppg.component';

describe('FPPGComponent', () => {
  let component: FPPGComponent;
  let fixture: ComponentFixture<FPPGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FPPGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FPPGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

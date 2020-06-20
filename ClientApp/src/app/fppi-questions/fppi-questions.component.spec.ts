import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FppiQuestionsComponent } from './fppi-questions.component';

describe('FppiQuestionsComponent', () => {
  let component: FppiQuestionsComponent;
  let fixture: ComponentFixture<FppiQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FppiQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FppiQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

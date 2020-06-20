import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FppgQuestionsComponent } from './fppg-questions.component';

describe('FppgQuestionsComponent', () => {
  let component: FppgQuestionsComponent;
  let fixture: ComponentFixture<FppgQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FppgQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FppgQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

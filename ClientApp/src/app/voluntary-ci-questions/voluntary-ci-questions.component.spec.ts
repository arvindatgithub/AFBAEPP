import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntaryCiQuestionsComponent } from './voluntary-ci-questions.component';

describe('VoluntaryCiQuestionsComponent', () => {
  let component: VoluntaryCiQuestionsComponent;
  let fixture: ComponentFixture<VoluntaryCiQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoluntaryCiQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoluntaryCiQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

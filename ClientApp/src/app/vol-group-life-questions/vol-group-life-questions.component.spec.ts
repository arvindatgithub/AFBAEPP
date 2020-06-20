import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolGroupLifeQuestionsComponent } from './vol-group-life-questions.component';

describe('VolGroupLifeQuestionsComponent', () => {
  let component: VolGroupLifeQuestionsComponent;
  let fixture: ComponentFixture<VolGroupLifeQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolGroupLifeQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolGroupLifeQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

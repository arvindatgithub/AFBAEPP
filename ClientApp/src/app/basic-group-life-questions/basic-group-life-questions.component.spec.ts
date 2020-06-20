import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicGroupLifeQuestionsComponent } from './basic-group-life-questions.component';

describe('BasicGroupLifeQuestionsComponent', () => {
  let component: BasicGroupLifeQuestionsComponent;
  let fixture: ComponentFixture<BasicGroupLifeQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicGroupLifeQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicGroupLifeQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

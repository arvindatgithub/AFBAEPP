import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicGroupLifeComponent } from './basic-group-life.component';

describe('BasicGroupLifeComponent', () => {
  let component: BasicGroupLifeComponent;
  let fixture: ComponentFixture<BasicGroupLifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicGroupLifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicGroupLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolGroupLifeComponent } from './vol-group-life.component';

describe('VolGroupLifeComponent', () => {
  let component: VolGroupLifeComponent;
  let fixture: ComponentFixture<VolGroupLifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolGroupLifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolGroupLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

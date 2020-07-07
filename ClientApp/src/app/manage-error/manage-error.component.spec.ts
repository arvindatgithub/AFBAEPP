import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageErrorComponent } from './manage-error.component';

describe('ManageErrorComponent', () => {
  let component: ManageErrorComponent;
  let fixture: ComponentFixture<ManageErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

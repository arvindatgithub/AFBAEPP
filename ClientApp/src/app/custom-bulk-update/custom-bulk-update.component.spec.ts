import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBulkUpdateComponent } from './custom-bulk-update.component';

describe('CustomBulkUpdateComponent', () => {
  let component: CustomBulkUpdateComponent;
  let fixture: ComponentFixture<CustomBulkUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomBulkUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomBulkUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBulkTemplateComponent } from './custom-bulk-template.component';

describe('CustomBulkTemplateComponent', () => {
  let component: CustomBulkTemplateComponent;
  let fixture: ComponentFixture<CustomBulkTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomBulkTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomBulkTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSetupComponent } from './agent-setup.component';

describe('AgentSetupComponent', () => {
  let component: AgentSetupComponent;
  let fixture: ComponentFixture<AgentSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

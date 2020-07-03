import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GroupSetupComponent } from './group-setup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';

describe('GroupSetupComponent', () => {
  let component: GroupSetupComponent;
  let fixture: ComponentFixture<GroupSetupComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [ GroupSetupComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(GroupSetupComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  }));;
 

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSetupComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('form invalid when empty', () => {
    component.groupSetupFG.controls.fcEffDate.setValue('');
    // component.registerForm.controls.email.setValue('');
    // component.registerForm.controls.phone.setValue('');
    // component.registerForm.controls.password.setValue('');
    // component.registerForm.controls.confirmPassword.setValue('');
    expect(component.groupSetupFG.valid).toBeFalsy();
  });
 

});

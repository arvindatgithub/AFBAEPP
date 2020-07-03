import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { AccidentComponent } from './accident.component';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';

import { GroupsearchService } from '../services/groupsearch.service';
import { DatePipe } from '@angular/common';

import { EppCreateGrpSetupService } from '../services/epp-create-grp-setup.service';

fdescribe('AccidentComponent', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule,ReactiveFormsModule], 
    declarations:[AccidentComponent],
    providers: [GroupsearchService,EppCreateGrpSetupService]
  }));

   it('should be created', () => {
    const service: GroupsearchService = TestBed.get(GroupsearchService);
    expect(service).toBeTruthy();
   });

   it('should have getData function', () => {
    const service: GroupsearchService = TestBed.get(GroupsearchService);
    expect(service.getGroupsData).toBeTruthy();
   });

   it('should be created', () => {
    const service: EppCreateGrpSetupService = TestBed.get(EppCreateGrpSetupService);
    expect(service).toBeTruthy();
   });

   it('should have getData function', () => {
    const service: EppCreateGrpSetupService = TestBed.get(EppCreateGrpSetupService);
    expect(service.getGroupNbrEppData).toBeTruthy();
   });
//////

  it('should be created:AccidentComponent', () => {
    const service: AccidentComponent = TestBed.get(GroupsearchService);
    expect(service).toBeTruthy();
   });

   it('should be created:EppCreateGrpSetupService', () => {
    const service: EppCreateGrpSetupService = TestBed.get(GroupsearchService);
    expect(service).toBeTruthy();
   });

  // it('should have getData function:AccidentComponent', () => {
  //   const service: AccidentComponent = TestBed.get(GroupsearchService);
  //   expect(service.myForm).toBeTruthy();
  //  });



});
// ng test --code-coverage
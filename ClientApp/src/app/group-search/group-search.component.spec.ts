import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSearchComponent } from './group-search.component';

import { RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GroupsearchService } from '../services/groupsearch.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

fdescribe('GroupSearchComponent', () => {
  let component: GroupSearchComponent;
  let fixture: ComponentFixture<GroupSearchComponent>;
  let GROUP_OBJECT = 
    [{
      "grpId": 10004,
      "grpNbr": "42345",
      "grpNm": "Group Four"
    }];
    
  let groupSearchService:GroupsearchService;
 
  class mockService {
    editGrpNbr;
    fromSearchFlag;
    public getGroupsData() : Observable<any>{
      return of(GROUP_OBJECT);
    }
     public setEditGrpNbr(Nbr) {
       this.editGrpNbr = Nbr;
     }
     public getEditGrpNbr(){
      return this.editGrpNbr;
    }
     public setFromSearchFlag(flag) {
      this.fromSearchFlag = flag;
     }
     public getFromSearchFlag() {
      return this.fromSearchFlag;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSearchComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule,RouterTestingModule.withRoutes([])],
      providers: [ 
        {provide: GroupsearchService, useClass: mockService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    groupSearchService = TestBed.get(GroupsearchService);
    groupSearchService.getGroupsData().subscribe((data) => {
      component.groups =  data;
    });
    expect(component.groups).toEqual(GROUP_OBJECT);
  });

  it('should check onSearchChange with correct value', () => {
    let searchValue = '42345';
    component.onSearchChange(searchValue);
    expect(component.disabledFlag).toBeFalsy;
  });

  it('should check onSearchChange with incorrect value', () => {
    let searchValue = '';
    component.onSearchChange(searchValue);
    expect(component.disabledFlag).toBeTruthy;
  });

  it('should check GroupSearch function with groups data and search by group number', () => {
    component.groups = GROUP_OBJECT;
    component.searchBoxVal = '42345';
    component.GroupSearch();
  });

  it('should check GroupSearch function with groups data and search by group name', () => {
    component.groups = GROUP_OBJECT;
    component.searchBoxVal = 'Group Four';
    component.GroupSearch();
  });

  it('should check GroupSearch function with groups data and search by group name/ number not exist', () => {
    component.groups = GROUP_OBJECT;
    component.searchBoxVal = 'Group';
    component.GroupSearch();
  });

  it('should check GroupSearch function with empty groups data', () => {
    component.groups = null;
    component.GroupSearch();
  });

  it('should check gotosetup function', () => {
    component.goToSetup(42345);
  });

  it('should check goToSearch function', () => {
    component.goToSearch();
    expect(component.groupSearchSection).toBeTruthy;
    expect(component.groupSearchResults).toBeFalsy;
  });

 
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BasicGroupLifeComponent } from './basic-group-life.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupsearchService } from '../services/groupsearch.service';
import { EppCreateGrpSetupService } from '../services/epp-create-grp-setup.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';

fdescribe('BasicGroupLifeComponent', () => {
  let component: BasicGroupLifeComponent;
  let fixture: ComponentFixture<BasicGroupLifeComponent>;
  let lookUpDataSitusStates= [
    {id:'0',state : 'AL'},
    {id:'1',state : 'HI'},
  ];
  let bglData = {
    "isBGLActive": true,
    "bgl": {
      "effctv_dt": "1970-01-01T00:00:00.000Z",
      "grp_situs_state": "IN",
      "emp_face_amt_mon_bnft": "43",
      "sp_face_amt_mon_bnft": "46",
      "ch_face_amt_mon_bnft_01": "45",
      "effctv_dt_action": "10003",
      "grp_situs_state_action": "10003",
      "emp_face_amt_mon_bnft_action": "10002",
      "sp_face_amt_mon_bnft_action": "10002",
      "ch_face_amt_mon_bnft_01_action": "10002",
      "agnt_cd_1": "",
      "agnt_nm": "",
      "agnt_comm_split_1": "",
      "agntsub_1": "",
      "agnt_cd_2": "",
      "agnt_comm_split_2": "",
      "agntsub_2": "",
      "agnt_cd_3": "",
      "agnt_comm_split_3": "",
      "agntsub_3": "",
      "agnt_cd_4": "",
      "agnt_comm_split_4": "",
      "agntsub_4": "",
      "agnt_cd_1_action": "10001",
      "agnt_nm_action": "10001",
      "agnt_comm_split_1_action": "10001",
      "agntsub_1_action": "10001",
      "agnt_cd_2_action": "10001",
      "agnt_comm_split_2_action": "10001",
      "agntsub_2_action": "10001",
      "agnt_cd_3_action": "10001",
      "agnt_comm_split_3_action": "10001",
      "agntsub_3_action": "10001",
      "agnt_cd_4_action": "10001",
      "agnt_comm_split_4_action": "10001",
      "agntsub_4_action": "10001"
    },
   
  }
  let radioButtonArr = [
    { value: '10002', name: 'Always Override' },
    { value: '10001', name: 'Update if Blank' },
    { value: '10003', name: 'Validate' }
  ];
  let bglDate;
  let bglStatus;
  let resetFlag = true;
  status;
  let lookupValue = "IN";
  let dateValue = "1970-01-01T00:00:00.000Z";

  let store = {};
  const mockLocalStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule], 
      declarations: [ BasicGroupLifeComponent ],
      providers: [GroupsearchService, EppCreateGrpSetupService ,DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicGroupLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
    localStorage.setItem('GroupNumApiData', JSON.stringify(bglData));
    component.bglData = JSON.parse(localStorage.getItem('GroupNumApiData'));
    expect(localStorage.getItem('GroupNumApiData')).toEqual(JSON.stringify(bglData));
    component.bglStatus = lookupValue;
    component.radioButtonArr = radioButtonArr;
    component.minDate = '';
    expect(component.bglData).not.toBeUndefined;
    component.ngOnInit();
  });

  it('should reset form', () => {
    component.resetfpp();
  });

  it('should check ngOnChanges function', () => {
    component.bglStatus = lookupValue;
    component.latest_datebasicgrplife = component.datepipe.transform(dateValue, 'yyyy-MM-dd');
    component.ngOnChanges();
  })

});

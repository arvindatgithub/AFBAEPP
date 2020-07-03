import { Component, OnInit, Input,ViewChild,OnChanges } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgentSetupComponent } from '../agent-setup/agent-setup.component';
import { DatePipe } from '@angular/common';
import { GroupsearchService } from '../services/groupsearch.service';
import { EppCreateGrpSetupService } from '../services/epp-create-grp-setup.service';
@Component({
  selector: 'app-hospital-indemnity',
  templateUrl: './hospital-indemnity.component.html',
  styleUrls: ['./hospital-indemnity.component.css']
})
export class HospitalIndemnityComponent implements OnInit,OnChanges {
  hospformgrp: FormGroup;
  @Input() lookupValue: any;
  @Input() dateValue: any;
  situsValue:string;
  public isLoading = false;
  lookUpDataSitusStates: any = [];
  name = false;
  dob = false;
  gender = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  public minDate = new Date().toISOString().slice(0,10);
  latest_datehospitalindemnity;
  jobs =  [{name: 'On the Job Only', abbrev: 'on'},
  {name: 'Off the Job Only', abbrev: 'off'},
  {name: 'both', abbrev: 'noupdate'}];

  radioButtonArr=[
    {value:'10002',name:'Always Override'},
    {value:'10001',name:'Update if Blank'},
    {value:'10003',name:'Validate'}
  ];
  hiData;
  hiDate;
  hiStatus;
  resetFlag = true;
  Rate =  [
  {no: '0', abb: 'Select'},
  {no: '1', abb: '1'},
  {no: '2', abb: '2'},
  {no: '3', abb: '3'}];
  ch_fname_01;
  ch_dob_01;
  ch_gndr_01;
  sp_fname;
  sp_dob;
  sp_gndr;
  
  constructor(private lookupService: LookupService, private fb:FormBuilder,public datepipe: DatePipe,
    private groupsearchService: GroupsearchService, private eppservice:EppCreateGrpSetupService) {

      this.eppservice.castAddEditClone.subscribe(data => {
        let status = data;
        if(status == 'Edit' || status == 'Add'){
          this.hospformgrp.enable();
          this.resetFlag = false;
        } else {
          this.resetFlag = true;
        }
      });

      let existingSelectedGrpNbr: any;
      this.groupsearchService.castGroupNumber.subscribe(data => {
        existingSelectedGrpNbr = data; 
        console.log("HI "+ existingSelectedGrpNbr); 
        this.eppservice.getGroupNbrEppData(existingSelectedGrpNbr).subscribe(data => {
          this.hiData = data;
          
          console.log('acc'+ JSON.stringify(data));
  
          if(this.hiData !== undefined){
            if(this.hiData.isHIActive){
              this.hiDate = this.datepipe.transform(this.hiData.hi.effctv_dt, 'yyyy-MM-dd');
              if(this.hiData.hi.grp_situs_state !== null){
                this.hiStatus = this.hiData.hi.grp_situs_state;
              } else {
                this.hiStatus = this.lookupValue;
              }
              this.sp_fname = this.hiData.hi.sp_fname == 1 ? true : false;
              this.sp_dob = this.hiData.hi.sp_dob == 1 ? true : false;
              this.sp_gndr = this.hiData.hi.sp_gndr == 1 ? true : false;

              this.ch_fname_01 = this.hiData.hi.ch_fname_01 == 1 ? true : false;
              this.ch_dob_01 = this.hiData.hi.ch_dob_01 == 1 ? true : false;
              this.ch_gndr_01 = this.hiData.hi.ch_gndr_01 == 1 ? true : false;
            }
            
              this.hospformgrp = this.fb.group({
                FChospEffectiveDate: [(this.hiData.isHIActive) ? this.hiDate : this.minDate,Validators.required],
                FChospEffectiveDate_Action: [(this.hiData.isHIActive) ? this.hiData.hi.effctv_dt_action : this.radioButtonArr[1].value,Validators.required],
                FChospSitusState: [(this.hiData.isHIActive) ? this.hiStatus : this.lookupValue,Validators.required],
                FChospSitusState_Action: [(this.hiData.isHIActive) ? this.hiData.hi.grp_situs_state_action : this.radioButtonArr[1].value,Validators.required],
                FChospRateLevel:[(this.hiData.isHIActive)  ? this.hiData.hi.rate_lvl : this.Rate[0].no ,Validators.required],
                FChospRateLevel_Action:[(this.hiData.isHIActive) ? this.hiData.hi.rate_lvl_action : this.radioButtonArr[1].value,Validators.required],
                FchospChildName: [(this.hiData.isHIActive) ? this.ch_fname_01 : false,Validators.required],
                FchospChildDOB: [(this.hiData.isHIActive) ? this.ch_dob_01 : false,Validators.required],
                FchospChildGender :[(this.hiData.isHIActive) ? this.ch_gndr_01 : false,Validators.required],
                FchospSpouseName :[(this.hiData.isHIActive) ? this.sp_fname : false,Validators.required],
                FchospSpouseDOB :[(this.hiData.isHIActive) ? this.sp_dob : false,Validators.required],
                FchospSpouseGender: [(this.hiData.isHIActive) ? this.sp_gndr : false,Validators.required],

              });

              if(this.groupsearchService.getFromSearchFlag()){
                this.hospformgrp.disable();
              }else{
                this.hospformgrp.enable();
                this.resetFlag = false;
              }
          }
        });
      });

     

    }
  // get myForm() {
  //   return this.hospformgrp.get('FChospSitusState');
  // }
  ngOnChanges(){
   
    this.latest_datehospitalindemnity = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
    //this.myForm.setValue(this.lookupValue);
  
  }

  ngOnInit() {
    this.lookupService.getLookupsData()
      .subscribe((data: any) => {
        this.isLoading = true;
        console.log("data", data);
        this.lookUpDataSitusStates = data.situsState;
        // this.myForm.setValue(this.lookUpDataSitusStates[0].state);
       
      });
    
  // getLookupValueSitusState(value: any){
  //   this.lookupSitusStateValue = value;
  // }

  
}
hospitalindemnity(){
  this.hospformgrp.reset({
    FChospEffectiveDate: "",
 
  }) 
 
}


}

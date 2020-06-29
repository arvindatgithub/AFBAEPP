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
  radioButtonArr=[
    {value:'10002',name:'Always Override'},
    {value:'10001',name:'Update if Blank'},
    {value:'10003',name:'Validate'}
  ];
  hiData;
  hiDate;
  hiStatus;

  constructor(private lookupService: LookupService, private fb:FormBuilder,public datepipe: DatePipe,
    private groupsearchService: GroupsearchService, private eppservice:EppCreateGrpSetupService) {

      let existingSelectedGrpNbr: any;
      this.groupsearchService.castGroupNumber.subscribe(data => {
        existingSelectedGrpNbr = data; 
        console.log("BGL "+ existingSelectedGrpNbr); 
      });

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
          }
          
            this.hospformgrp = this.fb.group({
              FChospEffectiveDate: [(this.hiData.isHIActive) ? this.hiDate : this.minDate,Validators.required],
              FChospEffectiveDate_Action: [(this.hiData.isHIActive) ? this.hiData.hi.effctv_dt_action : this.radioButtonArr[1].value,Validators.required],
              FChospSitusState: [(this.hiData.isHIActive) ? this.hiStatus : this.lookupValue,Validators.required],
              FChospSitusState_Action: [(this.hiData.isHIActive) ? this.hiData.hi.grp_situs_state_action : this.radioButtonArr[1].value,Validators.required],
            });
          
          
        }
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
        //this.myForm.setValue(this.lookUpDataSitusStates[0].state);
       
      });
    
  // getLookupValueSitusState(value: any){
  //   this.lookupSitusStateValue = value;
  // }

  
}
hospitalindemnity(){
  this.hospformgrp.reset({
    FChospEffectiveDate: "",
    FChospEffectiveDate_Action:"",
    FChospSitusState: "",
    FChospSitusState_Action: "",
  }) 
 
}


}

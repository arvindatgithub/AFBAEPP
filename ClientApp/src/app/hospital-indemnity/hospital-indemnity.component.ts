import { Component, OnInit, Input,ViewChild,OnChanges } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgentSetupComponent } from '../agent-setup/agent-setup.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-hospital-indemnity',
  templateUrl: './hospital-indemnity.component.html',
  styleUrls: ['./hospital-indemnity.component.css']
})
export class HospitalIndemnityComponent implements OnInit,OnChanges {
  // hospformgrp: FormGroup;
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
  ]

  constructor(private lookupService: LookupService, private fb:FormBuilder,public datepipe: DatePipe) { }

  hospformgrp = this.fb.group({
    FChospEffectiveDate: ["",Validators.required],
    FChospEffectiveDate_Action: [this.radioButtonArr[1].value,Validators.required],
    FChospSitusState: ["",Validators.required],
    FChospSitusState_Action: [this.radioButtonArr[1].value,Validators.required],
  })
  get myForm() {
    return this.hospformgrp.get('FChospSitusState');
  }
  ngOnChanges(){
   
    this.latest_datehospitalindemnity = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
    this.myForm.setValue(this.lookupValue);
  
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

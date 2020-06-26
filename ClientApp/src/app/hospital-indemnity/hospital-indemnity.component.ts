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
  latest_datehospitalindemnity
  constructor(private lookupService: LookupService, private fb:FormBuilder,public datepipe: DatePipe) { }


  ngOnChanges(){
   
    this.latest_datehospitalindemnity = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.lookupService.getLookupsData()
      .subscribe((data: any) => {
        this.isLoading = true;
        console.log("data", data);
        this.lookUpDataSitusStates = data.situsState;
       
      });
    
  // getLookupValueSitusState(value: any){
  //   this.lookupSitusStateValue = value;
  // }

  this.hospformgrp = this.fb.group({
    FChospEffectiveDate: [this.dateValue,Validators.required],
    FChospEffectiveDate_Action: [this.lookupValue,Validators.required],
    FChospSitusState: [this.lookupValue,Validators.required],
    FChospSitusState_Action: ["",Validators.required],
  })
}
hospitalindemnity(){
  this.hospformgrp.reset({
    FChospEffectiveDate: "",
    FChospEffectiveDate_Action:"",
    FChospSitusState: "",
    FChospSitusState_Action: "",
  }) 
 
}

onItemChange(value){
  console.log(" Value is : ", value );
}

}

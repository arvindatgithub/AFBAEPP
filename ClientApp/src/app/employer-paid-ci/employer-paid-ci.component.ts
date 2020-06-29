import { Component, OnInit, Input,ViewChild,OnChanges } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgentSetupComponent } from '../agent-setup/agent-setup.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-employer-paid-ci',
  templateUrl: './employer-paid-ci.component.html',
  styleUrls: ['./employer-paid-ci.component.css']
})
export class EmployerPaidCIComponent implements OnInit ,OnChanges{
  // empCIformgrp: FormGroup;
  @Input() lookupValue: any;
  @Input() dateValue: any;
  situsValue:string;
  // subscription: Subscription;
  public isLoading = false;
  lookUpDataSitusStates: any = [];
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  latest_dateemppaisci;
  public minDate = new Date().toISOString().slice(0,10);
  latest_date;
  radioButtonArr=[
    {value:'10002',name:'Always Override'},
    {value:'10001',name:'Update if Blank'},
    {value:'10003',name:'Validate'}
  ]
  constructor(private lookupService: LookupService, private fb:FormBuilder,public datepipe: DatePipe) { }

  empCIformgrp = this.fb.group({
    FCempCIEffectiveDate: [this.dateValue,Validators.required],
    FCempCIEffectiveDate_Action: [this.radioButtonArr[1].value,Validators.required],
    FCempCISitusState_Action: [this.radioButtonArr[1].value,Validators.required],
    FCempCISitusState: [this.lookupValue,Validators.required],
   
    FCempCIEmpFcAmt: ["",Validators.required],
    FCempCIEmpFcAmt_Action: [this.radioButtonArr[1].value,Validators.required],
  
    FCempCIPlanCode_Action: [this.radioButtonArr[1].value,Validators.required],

    FCempCIEMPPlanCode: ["",Validators.required],
    FCempCISpouseFcAmt: ["",Validators.required],
    FCempCIChdFcAmt: ["",Validators.required],
    
    FCempCIChdFcAmt_Action: [this.radioButtonArr[1].value,Validators.required],
    FCempCISpouseFcAmt_Action:[this.radioButtonArr[1].value, Validators.required]
  });
  get myForm() {
    return this.empCIformgrp.get('FCempCISitusState');
  }

  ngOnChanges(){
    
    this.latest_dateemppaisci = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
    this.myForm.setValue(this.lookupValue);
   
  }
  
  ngOnInit() {
    this.lookupService.getLookupsData()
    .subscribe((data: any) => {
      this.isLoading = true;
      console.log("data", data);
      this.lookUpDataSitusStates = data.situsState;
      this.myForm.setValue(this.lookUpDataSitusStates[0].state);
    });

   
   
  }

 
  resetEmpCi(){
    this.empCIformgrp.reset({
      FCempCIEffectiveDate: "",
      FCempCIEmpFcAmt: "",
      FCempCIEMPPlanCode:"",
      FCempCISpouseFcAmt: "",
      FCempCIChdFcAmt:"",

    })
  }

  onItemChange(value){
    console.log(" Value is : ", value );
 }
}

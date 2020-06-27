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
  empCIformgrp: FormGroup;
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

  constructor(private lookupService: LookupService, private fb:FormBuilder,public datepipe: DatePipe) { }


  ngOnChanges(){
    
    this.latest_dateemppaisci = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
  }
  
  ngOnInit() {
    this.lookupService.getLookupsData()
    .subscribe((data: any) => {
      this.isLoading = true;
      console.log("data", data);
      this.lookUpDataSitusStates = data.situsState;
      
    });

    this.empCIformgrp = this.fb.group({
      FCempCIEffectiveDate: [this.dateValue,Validators.required],
      FCempCIEffectiveDate_Action: ["",Validators.required],
      FCempCISitusState_Action: ["",Validators.required],
      FCempCISitusState: [this.lookupValue,Validators.required],
     
      FCempCIEmpFcAmt: ["",Validators.required],
      FCempCIEmpFcAmt_Action: ["",Validators.required],
    
      FCempCIPlanCode_Action: ["",Validators.required],

      FCempCIEMPPlanCode: ["",Validators.required],
      FCempCISpouseFcAmt: ["",Validators.required],
      FCempCIChdFcAmt: ["",Validators.required],
      
      FCempCIChdFcAmt_Action: ["",Validators.required],
      FCempCISpouseFcAmt_Action:["", Validators.required]
    });
    //this.empCIformgrp.controls['FCempCISitusState'].setValue(this.lookUpDataSitusStates[0].state, {onlySelf:true});
  }

 
  // getLookupValueSitusState(value: any){
  //   this.lookupSitusStateValue = value;
  // }

  onItemChange(value){
    console.log(" Value is : ", value );
 }
}

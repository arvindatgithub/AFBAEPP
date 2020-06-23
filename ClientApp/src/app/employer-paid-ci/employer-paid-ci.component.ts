import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-employer-paid-ci',
  templateUrl: './employer-paid-ci.component.html',
  styleUrls: ['./employer-paid-ci.component.css']
})
export class EmployerPaidCIComponent implements OnInit {
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
  public minDate = new Date().toISOString().slice(0,10);
  latest_date;

  constructor(private lookupService: LookupService, private fb:FormBuilder,public datepipe: DatePipe) { }

  ngOnChanges(simpleChange:SimpleChanges){
    console.log("simpleChange",simpleChange);
    this.latest_date = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
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
      FCempCISpouseFcAmt: ["",Validators.required],
      FCempCIEmpFcAmt: ["",Validators.required],
      FCempCIEmpFcAmt_Action: ["",Validators.required],
      FCempCIPlanCode: ["",Validators.required],
      FCempCIPlanCode_Action: ["",Validators.required],
      FCempCIChdFcAmt: ["",Validators.required],
      FCempCIChdFcAmt_Action: ["",Validators.required],
    })
  }
  // getLookupValueSitusState(value: any){
  //   this.lookupSitusStateValue = value;
  // }

  onItemChange(value){
    console.log(" Value is : ", value );
 }
}

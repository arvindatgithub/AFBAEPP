import { Component, OnInit, Input } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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

  constructor(private lookupService: LookupService, private fb:FormBuilder) { }

  ngOnInit() {
    this.lookupService.getLookupsData()
    .subscribe((data: any) => {
      this.isLoading = true;
      console.log("data", data);
      this.lookUpDataSitusStates = data.situsState;
    });

    this.empCIformgrp = this.fb.group({
      FCempCIEffectiveDate: ["",Validators.required],
      FCempCIEffectiveDate_Action: ["",Validators.required],
      FCempCISitusState_Action: ["",Validators.required],
      FCempCISitusState: ["",Validators.required],
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

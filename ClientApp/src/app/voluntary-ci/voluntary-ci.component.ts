import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-voluntary-ci',
  templateUrl: './voluntary-ci.component.html',
  styleUrls: ['./voluntary-ci.component.css']
})
export class VoluntaryCIComponent implements OnInit,OnChanges {
  volCIformgrp: FormGroup;
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
  latest_datevolci;
  radioButtonArr=[
    {value:'10002',name:'Always Override'},
    {value:'10001',name:'Update if Blank'},
    {value:'10003',name:'Validate'}
  ]
  constructor(private lookupService: LookupService, private fb:FormBuilder,public datepipe: DatePipe) { }

ngOnChanges(){
  this.latest_datevolci = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
}

  ngOnInit() {
    this.lookupService.getLookupsData()
    .subscribe((data: any) => {
      this.isLoading = true;
      console.log("data", data);
      this.lookUpDataSitusStates = data.situsState;
    });

    this.volCIformgrp = this.fb.group({
      FCVolCIEffectiveDate: [this.dateValue,Validators.required],
      FCVolCIEffectiveDate_Action: [this.radioButtonArr[1].value,Validators.required],
      FCVolCISitusState: [this.lookupValue,Validators.required],
      FCVolCISitusState_Action: [this.radioButtonArr[1].value,Validators.required],
      FCVolCIEmpGIAmtMax: ["",Validators.required],
      FCVolCIEmpGIAmtMax_Action: [this.radioButtonArr[1].value,Validators.required],
      FCVolCIEmpQIAmtMax: ["",Validators.required],
      FCVolCIEmpAmtMax: ["",Validators.required],
      FCVolCISpouseGIAmtMax: ["",Validators.required],
      FCVolCISpouseQIAmtMax: ["",Validators.required],
      FCVolCISpouseAmtMax: ["",Validators.required],
      FCVolCISpouseAmtMax_Action: [this.radioButtonArr[1].value,Validators.required],
      FCVolCIEmpPlanCode: ["",Validators.required],
      FCVolCISpousePlanCode: ["",Validators.required],
      FCVolCIChildPlanCode: ["",Validators.required],
      FCVolCIPlanCodeManualEntry_Action: [this.radioButtonArr[1].value,Validators.required],
      //FCVolCIOpenEnrollGI: ["",Validators.required],
      //FCVolCIOpenEnrollGI_Action: [this.radioButtonArr[1].value,Validators.required],
      FCVolCIEmpNTB: ["",Validators.required],
      FCVolCIEmpNTB_Action: [this.radioButtonArr[1].value,Validators.required],
      FCVolCIEmpTB_Action: [this.radioButtonArr[1].value,Validators.required],
      FCVolCIEmpTB: ["",Validators.required],
      FCVolCISpouseNTB: ["",Validators.required],
      FCVolCISpouseNTB_Action: [this.radioButtonArr[1].value,Validators.required],
      FCVolCISpouseTB_Action: [this.radioButtonArr[1].value,Validators.required],
      FCVolCISpouseTB: ["",Validators.required],
    })
  }
  // getLookupValueSitusState(value: any){
  //   this.lookupSitusStateValue = value;
  // }

}

import { Component, OnInit, Input,ViewChild,SimpleChanges, OnChanges } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgentSetupComponent } from '../agent-setup/agent-setup.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-basic-group-life',
  templateUrl: './basic-group-life.component.html',
  styleUrls: ['./basic-group-life.component.css']
})
export class BasicGroupLifeComponent implements OnInit,OnChanges {
  basicGrpLfformgrp: FormGroup;
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
  latest_datebasicgrplife
  public minDate = new Date().toISOString().slice(0,10);
  radioButtonArr=[
    {value:'10002',name:'Always Override'},
    {value:'10001',name:'Update if Blank'},
    {value:'10003',name:'Validate'}
  ]

  constructor(private lookupService: LookupService, private fb:FormBuilder,public datepipe: DatePipe) {
  }


  ngOnChanges(){
    
    this.latest_datebasicgrplife = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
  }
  ngOnInit() {
    this.lookupService.getLookupsData()
      .subscribe((data: any) => {
        this.isLoading = true;
        console.log("data", data);
        this.lookUpDataSitusStates = data.situsState;
       
      });

      this.basicGrpLfformgrp = this.fb.group({
        FCbasicEffectiveDate_Action: [this.radioButtonArr[1].value,Validators.required],
        FCbasicEffectiveDate: [this.dateValue,Validators.required],
        FCbasicSitusState_Action: [this.radioButtonArr[1].value,Validators.required],
        FCbasicSitusState: [this.lookupValue,Validators.required],
        FCbasicEmpFcAmt_Action: [this.radioButtonArr[1].value,Validators.required],
        FCbasicEmpFcAmt: ["",Validators.required],
        SpouseFaceAmount: ["",Validators.required],
        ChildFaceAmount: ["",Validators.required],
      });
      //this.basicGrpLfformgrp.controls['FCbasicSitusState'].setValue(this.lookUpDataSitusStates[0].state, {onlySelf:true});

  }
  get myForm() {
    return this.basicGrpLfformgrp.get(['FCbasicSitusState','FCbasicEffectiveDate']);
  }
  onItemChange(value){
    console.log(" Value is : ", value );
 }

}

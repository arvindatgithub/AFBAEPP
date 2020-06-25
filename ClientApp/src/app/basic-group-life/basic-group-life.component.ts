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
        FCbasicEffectiveDate_Action: ["",Validators.required],
        FCbasicEffectiveDate: [this.lookupValue,Validators.required],
        FCbasicSitusState_Action: ["",Validators.required],
        FCbasicSitusState: ["",Validators.required],
        FCbasicEmpFcAmt_Action: ["",Validators.required],
        FCbasicEmpFcAmt: ["",Validators.required],
        FCbasicADDRider_Action: ["",Validators.required],
        FCbasicADDRider: ["",Validators.required],
      });
      this.basicGrpLfformgrp.controls['FCbasicSitusState'].setValue(this.lookUpDataSitusStates[0].state, {onlySelf:true});

  }
 
  onItemChange(value){
    console.log(" Value is : ", value );
 }

}

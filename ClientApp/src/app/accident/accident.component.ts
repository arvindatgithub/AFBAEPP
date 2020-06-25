import { Component, OnInit, Input,ViewChild,OnChanges,SimpleChanges } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgentSetupComponent } from '../agent-setup/agent-setup.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.css']
})
export class AccidentComponent implements OnInit,OnChanges {
  //@ViewChild('agent',{static:false}) agentComponent: AgentSetupComponent;
  accformgrp: FormGroup;
  @Input() lookupValue: any;
  @Input() dateValue: any;
  situsValue:string;
  public isLoading = false;
  lookUpDataSitusStates: any = [];
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  latest_dateaccident
  public minDate = new Date().toISOString().slice(0,10);

  constructor(private lookupService: LookupService, private fb:FormBuilder, public datepipe: DatePipe) { }


  ngOnChanges(){
   
    this.latest_dateaccident = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
  }


  ngOnInit() {
    this.lookupService.getLookupsData()
    .subscribe((data: any) => {
      this.isLoading = true;
      console.log("data", data);
      this.lookUpDataSitusStates = data.situsState;
      // this.latest_dateaccident = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
    });
    this.accformgrp = this.fb.group({
      FCaccSitusState_Action: ["",Validators.required],
      FCaccSitusState: ["",Validators.required],
      FCaccEffectiveDate: ["",Validators.required],
      FCaccEffectiveDate_Action: ["",Validators.required],
      FCaccOnOff: ["",Validators.required],
      FCaccOnOff_Action: ["",Validators.required],
      FCaccRateLevel: ["",Validators.required],
      FCaccRateLevel_Action: ["",Validators.required],

    });
    this.accformgrp.controls['FCaccSitusState'].setValue(this.lookUpDataSitusStates[0].state, {onlySelf:true});
  }
 
 
  onItemChange(value){
    console.log(" Value is : ", value );
 }
}

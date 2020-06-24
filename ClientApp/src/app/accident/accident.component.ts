import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';



import { AgentSetupComponent } from '../agent-setup/agent-setup.component';
@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.css']
})
export class AccidentComponent implements OnInit {
  accformgrp: FormGroup;
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
    this.accformgrp = this.fb.group({
      FCaccSitusState_Action: ["",Validators.required],
      FCaccSitusState: [this.lookupValue,Validators.required],
      FCaccEffectiveDate: [this.dateValue,Validators.required],
      FCaccEffectiveDate_Action: ["",Validators.required],
      FCaccOnOff: ["",Validators.required],
      FCaccOnOff_Action: ["",Validators.required],
      FCaccRateLevel: ["",Validators.required],
      FCaccRateLevel_Action: ["",Validators.required],

    })

  }
  // getLookupValueSitusState(value: any){
  //   this.lookupSitusStateValue = value;
  // }
  onItemChange(value){
    console.log(" Value is : ", value );
 }
}

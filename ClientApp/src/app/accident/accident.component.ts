import { Component, OnInit, Input,ViewChild,OnChanges,SimpleChanges } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.css']
})
export class AccidentComponent implements OnInit,OnChanges {
  //@ViewChild('agent',{static:false}) agentComponent: AgentSetupComponent;
  // accformgrp: FormGroup;
  @Input() lookupValue: any;
  @Input() dateValue: any;
  situsValue:string;
  public isLoading = false;
  lookUpDataSitusStates: any = [];
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  latest_dateaccident;
  public minDate = new Date().toISOString().slice(0,10);
  latest_date;
  radioButtonArr=[
    {value:'10002',name:'Always Override'},
    {value:'10001',name:'Update if Blank'},
    {value:'10003',name:'Validate'}
  ]
  jobs =  [{name: 'On the Job Only', abbrev: 'on'},
  {name: 'Off the Job Only', abbrev: 'off'},
  {name: 'both', abbrev: 'noupdate'}];

  Rate =  [{no: '1', abb: '1'},
  {no: '2', abb: '2'},
  {no: '3', abb: '3'}];
 // FCaccOnOff

  constructor(private lookupService: LookupService, private fb:FormBuilder, public datepipe: DatePipe) { }

  accformgrp = this.fb.group({
    FCaccSitusState_Action: [this.radioButtonArr[1].value,Validators.required],
    FCaccSitusState: ["",Validators.required],
    FCaccEffectiveDate: ["",Validators.required],
    FCaccEffectiveDate_Action: [this.radioButtonArr[1].value,Validators.required],
    FCaccOnOff: ["",Validators.required],
    FCaccOnOff_Action: [this.radioButtonArr[1].value,Validators.required],
    FCaccRateLevel: ["",Validators.required],
    FCaccRateLevel_Action: [this.radioButtonArr[1].value,Validators.required],

  });
  get myForm() {
    return this.accformgrp.get('FCaccSitusState');
  }
  ngOnChanges(){
   
    this.latest_dateaccident = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
    this.myForm.setValue(this.lookupValue);
  }


  ngOnInit() {
    this.lookupService.getLookupsData()
    .subscribe((data: any) => {
      this.isLoading = true;
      console.log("data", data);
      this.lookUpDataSitusStates = data.situsState;
      // this.myForm.setValue(this.lookUpDataSitusStates[0].state);
       this.latest_dateaccident = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
    }); 
   
    this.accformgrp.controls['FCaccOnOff'].setValue( this.jobs[0].abbrev, {onlySelf: true}); 
  }
  resetAcc(){
    this.accformgrp.reset({
      
      FCaccEffectiveDate: "",
     
      FCaccOnOff: "",
      FCaccOnOff_Action: "",
      FCaccRateLevel: "",
    

    })
  }
  
}

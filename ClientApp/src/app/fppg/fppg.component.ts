import { Component, OnInit, Input,ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { NgForm, FormControl, FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {RadioButtonComponent} from '../radio-button/radio-button.component'
import { EppCreateGrpSetupService } from '../services/epp-create-grp-setup.service';
import { AgentSetupComponent } from '../agent-setup/agent-setup.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-fppg',
  templateUrl: './fppg.component.html',
  styleUrls: ['./fppg.component.css']
})
export class FPPGComponent implements OnInit, OnChanges {

  fppgformgrp: FormGroup;
  @Input() lookupValue: any;
  @Input() dateValue: any;
  @ViewChild('effDate',{static:false}) radiobutton:ElementRef;
  situsValue:string;
  // subscription: Subscription;
  public isLoading = false;
  lookUpDataSitusStates: any = [];
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  public minDate = new Date().toISOString().slice(0,10);
  agentValue: string;
  latest_date;
  initial_SitusState;

  constructor(private lookupService: LookupService, 
    private fb:FormBuilder, private eppservice:EppCreateGrpSetupService,
    public datepipe: DatePipe ) { 
  }

  
  get myForm() {
    return this.fppgformgrp.get(['FCfppgSitusState','FCfppgEffectiveDate']);
  }

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
  
      console.log("this.lookup", this.lookUpDataSitusStates);
      this.fppgformgrp = this.fb.group({
        FCfppgEffectiveDate: ["",Validators.required],
        FCfppgSitusState: ["",Validators.required],
        FCfppgEmpAmtMax: ["",Validators.required],
        FCfppgEmpGIAmtMax: ["",Validators.required],
        FCfppgEmpQIAmtMax: ["",Validators.required],
        FCfppgSpouseGIAmtMax: ["",Validators.required],
        FCfppgSpouseQIAmtMax: ["",Validators.required],
        FCfppgSpouseMaxAmt: ["",Validators.required],
        FCfppgOpenEnrollGI: ["",Validators.required],
       
        FCfppgEmpPlanCode: ["", Validators.required],
        FCfppgSpousePlanCode: ["", Validators.required],
        FCfppgChildPlanCode: ["", Validators.required],
        
        FCfppgQolRiders: ["",Validators.required],
        FCfppgWaiver:["",Validators.required],
        FCfppgEffectiveDate_Action: ['Update if Blank', Validators.required],
        FCfppgSitusState_Action:  ['Update if Blank', Validators.required],
        FCfppgEmpAmtMax_Action: ['Update if Blank', Validators.required],
        FCfppgSpouseAmtMax_Action: ['Update if Blank', Validators.required],
        FCfppgOpenEnrollGI_Action: ['Update if Blank', Validators.required],
        FCfppgPlanCodeManualEntry_Action: ['Update if Blank', Validators.required],
        FCfppgQolRiders_Action: ['Update if Blank', Validators.required],
        FCfppgWaiver_Action: ['Update if Blank', Validators.required],
      });
    
    
    //  this.myForm.setValue(this.lookUpDataSitusStates.state[0],(new Date().toISOString()));
   
  }
 

  onItemChange(value){
    console.log(" Value is : ", value );
 }
 restForm(){
   this.fppgformgrp.reset({
    FCfppgEffectiveDate: "",
    FCfppgSitusState: "",
    FCfppgEmpAmtMax: "",
    FCfppgEmpGIAmtMax: "",
    FCfppgEmpQIAmtMax: "",
    FCfppgSpouseGIAmtMax: "",
    FCfppgSpouseQIAmtMax: "",
    FCfppgSpouseMaxAmt: "",
    FCfppgOpenEnrollGI: "",
    FCfppgPlanCodeManualEntry: "",
    FCfppgQolRiders: "",
    FCfppgWaiver:"",
    FCfppgEffectiveDate_Action: "",
    FCfppgSitusState_Action:  "",
    FCfppgEmpAmtMax_Action: "",
    FCfppgSpouseAmtMax_Action: "",
    FCfppgOpenEnrollGI_Action: "",
    FCfppgPlanCodeManualEntry_Action: "",
    FCfppgQolRiders_Action: "",
    FCfppgWaiver_Action: "",
   })
 }
}
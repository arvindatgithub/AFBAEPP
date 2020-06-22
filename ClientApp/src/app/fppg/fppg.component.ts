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
  @ViewChild('agent',{static:false}) agentComponent: AgentSetupComponent;
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

  constructor(private lookupService: LookupService, 
    private fb:FormBuilder, private eppservice:EppCreateGrpSetupService,
    public datepipe: DatePipe ) { 
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

    this.fppgformgrp = this.fb.group({
      FCfppgEffectiveDate: ["",Validators.required],
      FCfppgSitusState: [this.lookupValue,Validators.required],
      FCfppgEmpAmtMax: ["",Validators.required],
      FCfppgEmpGIAmtMax: ["",Validators.required],
      FCfppgEmpQIAmtMax: ["",Validators.required],
      FCfppgSpouseGIAmtMax: ["",Validators.required],
      FCfppgSpouseQIAmtMax: ["",Validators.required],
      FCfppgSpouseMaxAmt: ["",Validators.required],
      FCfppgOpenEnrollGI: ["",Validators.required],
      FCfppgPlanCodeManualEntry: ["",Validators.required],
      FCfppgQolRiders: ["",Validators.required],
      FCfppgWaiver:["",Validators.required],
      FCfppgEffectiveDate_Action: ['', Validators.required],
      FCfppgSitusState_Action:  ['', Validators.required],
      FCfppgEmpAmtMax_Action: ['', Validators.required],
      FCfppgSpouseAmtMax_Action: ['', Validators.required],
      FCfppgOpenEnrollGI_Action: ['', Validators.required],
      FCfppgPlanCodeManualEntry_Action: ['', Validators.required],
      FCfppgQolRiders_Action: ['', Validators.required],
      FCfppgWaiver_Action: ['', Validators.required]
    });
 
  }
  ngAfterViewInit(){
  let agentcomponenet = this.agentComponent.text
  console.log("agentcomponenet",agentcomponenet)
  }

  onItemChange(value){
    console.log(" Value is : ", value );
 }

}

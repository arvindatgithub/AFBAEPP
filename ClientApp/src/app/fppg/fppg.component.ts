import { Component, OnInit, Input,ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { NgForm, FormControl, FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {RadioButtonComponent} from '../radio-button/radio-button.component'
import { EppCreateGrpSetupService } from '../services/epp-create-grp-setup.service';
import { AgentSetupComponent } from '../agent-setup/agent-setup.component';
import { DatePipe } from '@angular/common';
import { GroupsearchService } from '../services/groupsearch.service';
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
  public minDate =new Date().toISOString().slice(0,10);
  agentValue: string;
  latest_date;
  initial_SitusState;
  emp_quality_of_life:any;
  sp_quality_of_life:any;

  radioButtonArr=[
    {value:'10002',name:'Always Override'},
    {value:'10001',name:'Update if Blank'},
    {value:'10003',name:'Validate'}
  ];
  groupsfppgData : any;
  

  constructor(private lookupService: LookupService, 
    private fb:FormBuilder, private eppservice:EppCreateGrpSetupService,
    public datepipe: DatePipe , private groupsearchService: GroupsearchService) { 

  //   let existingSelectedGrpNbr: any;
  //   this.groupsearchService.castGroupNumber.subscribe(data => {
  //     existingSelectedGrpNbr = data; 
  //     console.log("selected grp number from search "+ existingSelectedGrpNbr); 
  //   });

  //   this.eppservice.getGroupNbrEppData(existingSelectedGrpNbr).subscribe(data => {
  //     console.log('Groups Data on load from db'+ JSON.stringify(data));
  //     this.groupsfppgData = data;
  //     //this.minDate = this.datepipe.transform(this.groupsfppgData.fppg.effctv_dt, 'yyyy-MM-dd');
  //   });
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
  
      console.log("this.lookup", this.lookupValue);
    // let emp_gi_max_amt =  this.groupsfppgData.fppg.emp_gi_max_amt;
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
      FCfppgEffectiveDate_Action: [this.radioButtonArr[1].value, Validators.required],
      FCfppgSitusState_Action:  [this.radioButtonArr[1].value, Validators.required],
      FCfppgEmpAmtMax_Action: [this.radioButtonArr[1].value, Validators.required],
      FCfppgSpouseAmtMax_Action: [this.radioButtonArr[1].value, Validators.required],
      // FCfppgOpenEnrollGI_Action: [this.radioButtonArr[1].value, Validators.required],
      FCfppgPlanCodeManualEntry_Action: [this.radioButtonArr[1].value, Validators.required],
      FCfppgQolRiders_Action: [this.radioButtonArr[1].value, Validators.required],
      FCfppgWaiver_Action: [this.radioButtonArr[1].value, Validators.required],
    });

   // this.fppgformgrp.get('FCfppgEmpGIAmtMax').setValue(emp_gi_max_amt);
   // this.fppgformgrp.controls['FCfppgEmpGIAmtMax'].setValue(emp_gi_max_amt);
    
    //this.fppgformgrp.setValue({FCfppgEmpGIAmtMax: ''});
    //  this.fppgformgrp.controls['FCfppgSitusState'].setValue(this.lookUpDataSitusStates[0].state, {onlySelf:true});
 
  }

  onQolChecked(event:any){
    console.log("event",event);
    if(event.checked){
      this.emp_quality_of_life = "070";
      this.sp_quality_of_life = "070";
    }
    else{
      this.emp_quality_of_life = "";
      this.sp_quality_of_life = "";
    }
  }

  onWaiverChecked(event:any){
    
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
    //FCfppgPlanCodeManualEntry: "",
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
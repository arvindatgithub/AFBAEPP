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
  public minDate = new Date().toISOString().slice(0,10);
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
  fppgData;
  fppgDate;
  fppgSitus;
  resetFlag = true;
  status;

  constructor(private lookupService: LookupService, 
    private fb:FormBuilder, private eppservice:EppCreateGrpSetupService,
    public datepipe: DatePipe, private groupsearchService: GroupsearchService) { 
      
     
  }

 
  
  // get myForm() {
  //   return this.fppgformgrp.get('FCfppgSitusState');
  // }

ngOnChanges(simpleChange:SimpleChanges){
  console.log("simpleChange",simpleChange);
  let existingSelectedGrpNbr: any;
  this.groupsearchService.castGroupNumber.subscribe(data => {
    existingSelectedGrpNbr = data; 
    console.log("FPPG "+ existingSelectedGrpNbr); 

    this.fppgData = JSON.parse(localStorage.getItem('GroupNumApiData'));

    if(this.fppgData !== undefined){

      if(this.fppgData.isFPPGActive){
        this.fppgDate = this.datepipe.transform(this.fppgData.fppg.effctv_dt, 'yyyy-MM-dd');
        if(this.fppgData.fppg.grp_situs_state !== null){
          this.fppgSitus = this.fppgData.fppg.grp_situs_state;
        } else {
          this.fppgSitus = this.lookupValue;
        }
      }
      this.fppgformgrp = this.fb.group({
        FCfppgEffectiveDate: [(this.fppgData.isFPPGActive) ? this.fppgDate : this.minDate,Validators.required],
        FCfppgSitusState: [(this.fppgData.isFPPGActive) ? this.fppgSitus : this.lookupValue,Validators.required],
        FCfppgEmpAmtMax: [(this.fppgData.isFPPGActive) ? this.fppgData.fppg.emp_max_amt: "",Validators.required],
        FCfppgEmpGIAmtMax: [(this.fppgData.isFPPGActive) ? this.fppgData.fppg.emp_gi_max_amt : "",Validators.required],
        FCfppgEmpQIAmtMax: [(this.fppgData.isFPPGActive) ? this.fppgData.fppg.emp_qi_max_amt : "",Validators.required],
        FCfppgSpouseGIAmtMax: [(this.fppgData.isFPPGActive) ? this.fppgData.fppg.sp_gi_max_amt : "",Validators.required],
        FCfppgSpouseQIAmtMax: [(this.fppgData.isFPPGActive) ? this.fppgData.fppg.sp_qi_max_amt : "",Validators.required],
        FCfppgSpouseMaxAmt: [(this.fppgData.isFPPGActive) ? this.fppgData.fppg.sp_max_amt : "",Validators.required],
        //FCfppgOpenEnrollGI: [(this.fppgData.isFPPGActive) ? this.fppgData.fppg. : "",Validators.required],
        
        FCfppgEmpPlanCode: [(this.fppgData.isFPPGActive) ? this.fppgData.fppg.emp_plan_cd : "", Validators.required],
        FCfppgSpousePlanCode: [(this.fppgData.isFPPGActive) ? this.fppgData.fppg.sp_plan_cd :"", Validators.required],
        FCfppgChildPlanCode: [(this.fppgData.isFPPGActive) ? this.fppgData.fppg.ch_plan_cd : "", Validators.required],
        
        FCfppgQolRiders: [(this.fppgData.isFPPGActive) ?  this.fppgData.fppg.emp_quality_of_life: "",Validators.required],
        FCfppgWaiver:[(this.fppgData.isFPPGActive) ?  this.fppgData.fppg.emp_waiver_of_prem: "",Validators.required],
        FCfppgEffectiveDate_Action: [(this.fppgData.isFPPGActive) ? this.fppgData.fppg.effctv_dt_action : this.radioButtonArr[1].value, Validators.required],
        FCfppgSitusState_Action:  [(this.fppgData.isFPPGActive) ? this.fppgData.fppg.grp_situs_state_action : this.radioButtonArr[1].value, Validators.required],
        FCfppgEmpAmtMax_Action: [(this.fppgData.isFPPGActive) ? this.fppgData.fppg.emp_max_amt_action : this.radioButtonArr[1].value, Validators.required],
        FCfppgSpouseAmtMax_Action: [(this.fppgData.isFPPGActive) ? this.fppgData.fppg.sp_max_amt_action : this.radioButtonArr[1].value, Validators.required],
        // FCfppgOpenEnrollGI_Action: [this.radioButtonArr[1].value, Validators.required],
        FCfppgPlanCodeManualEntry_Action: [(this.fppgData.isFPPGActive) ? this.fppgData.fppg.emp_plan_cd_action : this.radioButtonArr[1].value, Validators.required],
        FCfppgQolRiders_Action: [(this.fppgData.isFPPGActive) ? this.fppgData.fppg.emp_quality_of_life_action : this.radioButtonArr[1].value, Validators.required],
        FCfppgWaiver_Action: [(this.fppgData.isFPPGActive) ? this.fppgData.fppg.emp_waiver_of_prem_action : this.radioButtonArr[1].value, Validators.required],
      });

      this.status = this.eppservice.getUserStatus();
      if(this.groupsearchService.getFromSearchFlag() && this.status == ''){
        this.fppgformgrp.disable();
        this.resetFlag = true;
      }else{
        this.fppgformgrp.enable();
        this.resetFlag = false;
      }
    }
  });

  
  this.latest_date = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
 // this.myForm.setValue(this.lookupValue);
  
}

  ngOnInit() {
    
    this.lookUpDataSitusStates = JSON.parse(localStorage.getItem('lookUpSitusApiData'));
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
    FCfppgEmpAmtMax: "",
    FCfppgEmpGIAmtMax: "",
    FCfppgEmpQIAmtMax: "",
    FCfppgSpouseGIAmtMax: "",
    FCfppgSpouseQIAmtMax: "",
    FCfppgSpouseMaxAmt: "",
    FCfppgOpenEnrollGI: "",
    
    FCfppgQolRiders: "",
    FCfppgWaiver:"",
  
   })
 }
}
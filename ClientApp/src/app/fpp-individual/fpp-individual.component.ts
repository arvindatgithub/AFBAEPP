import { Component, OnInit, Input ,SimpleChanges, OnChanges} from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-fpp-individual',
  templateUrl: './fpp-individual.component.html',
  styleUrls: ['./fpp-individual.component.css']
})
export class FPPIndividualComponent implements OnInit, OnChanges {
  fppiformgrp: FormGroup;
  @Input() lookupValue: any;
  @Input() dateValue: any;
  situsValue:string;
  subscription: Subscription;
  public isLoading = false;
  lookUpDataSitusStates: any = [];
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  public minDate = new Date().toISOString().slice(0,10);
  situsState:any;
  latest_datefpp;
  radioButtonArr=[
    {value:'10002',name:'Always Override'},
    {value:'10001',name:'Update if Blank'},
    {value:'10003',name:'Validate'}
  ]

  constructor(private lookupService: LookupService, private fb:FormBuilder, public datepipe: DatePipe) {
    
   } 
   ngOnChanges(){
  
    this.latest_datefpp = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
    
  }

  ngOnInit() {
    this.lookupService.getLookupsData()
    .subscribe((data: any) => {
      this.isLoading = true;
      console.log("data", data);
      this.lookUpDataSitusStates = (data.situsState);
    });

    this.fppiformgrp = this.fb.group({
      FCfppiEffectiveDate: [this.dateValue,Validators.required],
      FCfppiEffectiveDate_Action: [this.radioButtonArr[1].value,Validators.required],
      FCfppiAgentSign: ["",Validators.required],
      FCfppiAgentSign_Action: [this.radioButtonArr[1].value,Validators.required],
      FCfppiEmpGIAmtMax: ["",Validators.required],
      FCfppiEmpAmtMax_Action: [this.radioButtonArr[1].value,Validators.required],
      FCfppiEmpQIAmtMax: ["",Validators.required],
      FCfppiEmpAmtMax: ["",Validators.required],
      FCfppiSpouseGIAmtMax: ["",Validators.required],
      FCfppiSpouseQIAmtMax: ["",Validators.required],
      FCfppiSpouseMaxAmt: ["",Validators.required],
      FCfppiSpouseAmtMax_Action: [this.radioButtonArr[1].value,Validators.required],
      FCfppiOpenEnrollGI: ["",Validators.required],
      FCfppiOpenEnrollGI_Action: [this.radioButtonArr[1].value,Validators.required],
      FCfppiPlanCodeManualEntry_Action: [this.radioButtonArr[1].value,Validators.required],
      FCfppiPlanCodeManualEntry: ["",Validators.required],
      FCfppiUserToken: ["",Validators.required],
      FCfppiUserToken_Action: [this.radioButtonArr[1].value,Validators.required],
      FCfppiCaseToken: ["",Validators.required],
      FCfppiCaseToken_Action: [this.radioButtonArr[1].value,Validators.required],
      FCfppiQolRiders: ["",Validators.required],
      FCfppiQolRiders_Action: [this.radioButtonArr[1].value,Validators.required],
      FCfppiWaiver_Action: [this.radioButtonArr[1].value,Validators.required],
      FCfppiWaiver: ["",Validators.required],
    
      FCfppiempPlanCode: ["" ,Validators.required],
      FCfppiSpousePlanCode:["", Validators.required],
      FCfppiChildPlanCode:["", Validators.required],

    });
    //this.fppiformgrp.controls['FCfppSitusState'].setValue(this.lookUpDataSitusStates[0].state, {onlySelf:true});
  }
 
  onItemChange(value){
    console.log(" Value is : ", value );
 }
 resetfpp(){
  this.fppiformgrp.reset({
    FCfppiEffectiveDate: "",
   
    FCfppiAgentSign: "",
   
    FCfppiEmpGIAmtMax: "",
 
    FCfppiEmpQIAmtMax: "",
    FCfppiEmpAmtMax:"",
    FCfppiSpouseGIAmtMax: "",
    FCfppiSpouseQIAmtMax: "",
    FCfppiSpouseMaxAmt: "",
    
    FCfppiOpenEnrollGI: "",
  
    FCfppiPlanCodeManualEntry:"",
    FCfppiUserToken: "",
  
    FCfppiCaseToken: "",
  
    FCfppiQolRiders: "",
  
    FCfppiWaiver: "",
  })
 }
}
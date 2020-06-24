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
  latest_date;
  constructor(private lookupService: LookupService, private fb:FormBuilder, public datepipe: DatePipe) {
    
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
      this.lookUpDataSitusStates = (data.situsState);
    });

    this.fppiformgrp = this.fb.group({
      FCfppiEffectiveDate: ["",Validators.required],
      FCfppiEffectiveDate_Action: ["",Validators.required],
      FCfppiAgentSign: ["",Validators.required],
      FCfppiAgentSign_Action: ["",Validators.required],
      FCfppiEmpGIAmtMax: ["",Validators.required],
      FCfppiEmpAmtMax_Action: ["",Validators.required],
      FCfppiEmpQIAmtMax: ["",Validators.required],
      FCfppiEmpAmtMax: ["",Validators.required],
      FCfppiSpouseGIAmtMax: ["",Validators.required],
      FCfppiSpouseQIAmtMax: ["",Validators.required],
      FCfppiSpouseMaxAmt: ["",Validators.required],
      FCfppiSpouseAmtMax_Action: ["",Validators.required],
      FCfppiOpenEnrollGI: ["",Validators.required],
      FCfppiOpenEnrollGI_Action: ["",Validators.required],
      FCfppiPlanCodeManualEntry_Action: ["",Validators.required],
      FCfppiPlanCodeManualEntry: ["",Validators.required],
      FCfppiUserToken: ["",Validators.required],
      FCfppiUserToken_Action: ["",Validators.required],
      FCfppiCaseToken: ["",Validators.required],
      FCfppiCaseToken_Action: ["",Validators.required],
      FCfppiQolRiders: ["",Validators.required],
      FCfppiQolRiders_Action: ["",Validators.required],
      FCfppiWaiver_Action: ["",Validators.required],
      FCfppiWaiver: ["",Validators.required],
    });
    this.fppiformgrp.controls['FCfppSitusState'].setValue(this.lookUpDataSitusStates[0].state, {onlySelf:true});
  }
 
  onItemChange(value){
    console.log(" Value is : ", value );
 }
}
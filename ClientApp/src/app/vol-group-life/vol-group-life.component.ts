import { Component, OnInit, Input } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-vol-group-life',
  templateUrl: './vol-group-life.component.html',
  styleUrls: ['./vol-group-life.component.css']
})
export class VolGroupLifeComponent implements OnInit {
  volGrpLfformgrp: FormGroup;
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

  constructor(private lookupService: LookupService, private fb:FormBuilder) { }

  ngOnInit() {
    this.lookupService.getLookupsData()
    .subscribe((data: any) => {
      this.isLoading = true;
      console.log("data", data);
      this.lookUpDataSitusStates = data.situsState;
    });
    this.volGrpLfformgrp = this.fb.group({
      FCVolGrpLfEffectiveDate: ["",Validators.required],
      FCVolGrpLfEffectiveDate_Action: ["",Validators.required],
      FCVolGrpLfSitusState_Action: ["",Validators.required],
      FCVolGrpLfSitusState: ["",Validators.required],
      FCVolGrpLfEmpAmtMax_Action: ["",Validators.required],
      FCVolGrpLfEmpGIAmtMax: ["",Validators.required],
      FCVolGrpLfEmpAmtMax: ["",Validators.required],
      FCVolGrpLfSpouseAmtMax_Action: ["",Validators.required],
      FCVolGrpLfSpouseGIAmtMax: ["",Validators.required],
      FCVolGrpLfSpouseMaxAmt: ["",Validators.required],
      FCVolGrpLfOpenEnrollGI_Action: ["",Validators.required],
      FCVolGrpLfOpenEnrollGI: ["",Validators.required],
      FCVolGrpLfPlanCodeManualEntry_Action: ["",Validators.required],
      FCVolGrpLfPlanCodeManualEntry: ["",Validators.required],
      FCVolGrpLfUserToken_Action: ["",Validators.required],
      FCVolGrpLfUserToken: ["",Validators.required],
      FCVolGrpLfCaseToken_Action: ["",Validators.required],
      FCVolGrpLfCaseToken: ["",Validators.required],
    });
 
    
  }
  // getLookupValueSitusState(value: any){
  //   this.lookupSitusStateValue = value;
  // }
  onItemChange(value){
    console.log(" Value is : ", value );
 }

}

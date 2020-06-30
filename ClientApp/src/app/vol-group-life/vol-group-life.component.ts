import { Component, OnInit, Input,ViewChild ,OnChanges} from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgentSetupComponent } from '../agent-setup/agent-setup.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-vol-group-life',
  templateUrl: './vol-group-life.component.html',
  styleUrls: ['./vol-group-life.component.css']
})
export class VolGroupLifeComponent implements OnInit,OnChanges {
  // volGrpLfformgrp: FormGroup;
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
  latest_datevolgrplife;
  radioButtonArr=[
    {value:'10002',name:'Always Override'},
    {value:'10001',name:'Update if Blank'},
    {value:'10003',name:'Validate'}
  ]

  constructor(private lookupService: LookupService, private fb:FormBuilder,public datepipe: DatePipe) { }

  volGrpLfformgrp = this.fb.group({
    FCVolGrpLfEffectiveDate: [this.dateValue,Validators.required],
    FCVolGrpLfEffectiveDate_Action: [this.radioButtonArr[1].value,Validators.required],
    FCVolGrpLfSitusState_Action: [this.radioButtonArr[1].value,Validators.required],
    FCVolGrpLfSitusState: [this.lookupValue,Validators.required],
    FCVolGrpLfEmpAmtMax_Action: [this.radioButtonArr[1].value,Validators.required],
    FCVolGrpLfEmpGIAmtMax: ["",Validators.required],
    FCVolGrpLfEmpAmtMax: ["",Validators.required],
    FCVolGrpLfSpouseAmtMax_Action: [this.radioButtonArr[1].value,Validators.required],
    FCVolGrpLfSpouseGIAmtMax: ["",Validators.required],
    FCVolGrpLfSpouseMaxAmt: ["",Validators.required],
    FCVolGrpLfOpenEnrollGI_Action: [this.radioButtonArr[1].value,Validators.required],
    FCVolGrpLfOpenEnrollGI: ["",Validators.required],
    FCVolGrpLfPlanCodeManualEntry_Action: [this.radioButtonArr[1].value,Validators.required],
    // FCVolGrpLfPlanCodeManualEntry: ["",Validators.required],
    FCVolGrpLfEmployeePlanCode: ["",Validators.required],
    FCVolGrpLfSpousePlanCode: ["",Validators.required],
    FCVolGrpLfChildPlanCode: ["",Validators.required],
    FCVolGrpLfUserToken_Action: [this.radioButtonArr[1].value,Validators.required],
    FCVolGrpLfUserToken: ["",Validators.required],
    FCVolGrpLfCaseToken_Action: [this.radioButtonArr[1].value,Validators.required],
    FCVolGrpLfCaseToken: ["",Validators.required],
  });
  get myForm() {
    return this.volGrpLfformgrp.get('FCVolGrpLfSitusState');
  }
  ngOnChanges(){
   
    this.latest_datevolgrplife = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
    this.myForm.setValue(this.lookupValue);
  }

  ngOnInit() {
    this.lookupService.getLookupsData()
    .subscribe((data: any) => {
      this.isLoading = true;
      console.log("data", data);
      this.lookUpDataSitusStates = data.situsState;
      // this.myForm.setValue(this.lookUpDataSitusStates[0].state);
     
    });
     
  }

  volgrplife(){
    this.volGrpLfformgrp.reset({
      FCVolGrpLfEffectiveDate: "",
     
      FCVolGrpLfEmpGIAmtMax: "",
      FCVolGrpLfEmpAmtMax: "",
     
      FCVolGrpLfSpouseGIAmtMax:"",
      FCVolGrpLfSpouseMaxAmt: "",
    
      FCVolGrpLfOpenEnrollGI: "",
    
      FCVolGrpLfEmployeePlanCode: "",
      FCVolGrpLfSpousePlanCode: "",
      FCVolGrpLfChildPlanCode: "",
    
      FCVolGrpLfUserToken:"",
    
      FCVolGrpLfCaseToken: "",
    })
  }
 
}

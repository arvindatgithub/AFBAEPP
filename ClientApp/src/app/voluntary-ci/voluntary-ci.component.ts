import { Component, OnInit, Input } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-voluntary-ci',
  templateUrl: './voluntary-ci.component.html',
  styleUrls: ['./voluntary-ci.component.css']
})
export class VoluntaryCIComponent implements OnInit {
  volCIformgrp: FormGroup;
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

    this.volCIformgrp = this.fb.group({
      FCVolCIEffectiveDate: ["",Validators.required],
      FCVolCIEffectiveDate_Action: [this.lookupValue,Validators.required],
      FCVolCISitusState: ["",Validators.required],
      FCVolCISitusState_Action: ["",Validators.required],
      FCVolCIEmpGIAmtMax: ["",Validators.required],
      FCVolCIEmpGIAmtMax_Action: ["",Validators.required],
      FCVolCIEmpQIAmtMax: ["",Validators.required],
      FCVolCIEmpAmtMax: ["",Validators.required],
      FCVolCISpouseGIAmtMax: ["",Validators.required],
      FCVolCISpouseQIAmtMax: ["",Validators.required],
      FCVolCISpouseAmtMax: ["",Validators.required],
      FCVolCISpouseAmtMax_Action: ["",Validators.required],
      FCVolCIPlanCodeManualEntry: ["",Validators.required],
      FCVolCIPlanCodeManualEntry_Action: ["",Validators.required],
      FCVolCIOpenEnrollGI: ["",Validators.required],
      FCVolCIOpenEnrollGI_Action: ["",Validators.required],
      FCVolCIEmpNTB: ["",Validators.required],
      FCVolCIEmpNTB_Action: ["",Validators.required],
      FCVolCIEmpTB_Action: ["",Validators.required],
      FCVolCIEmpTB: ["",Validators.required],
      FCVolCISpouseNTB: ["",Validators.required],
      FCVolCISpouseNTB_Action: ["",Validators.required],
      FCVolCISpouseTB_Action: ["",Validators.required],
      FCVolCISpouseTB: ["",Validators.required],
    })
  }
  // getLookupValueSitusState(value: any){
  //   this.lookupSitusStateValue = value;
  // }
  onItemChange(value){
    console.log(" Value is : ", value );
 }

}

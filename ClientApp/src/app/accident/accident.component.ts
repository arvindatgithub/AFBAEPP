import { Component, OnInit, Input } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.css']
})
export class AccidentComponent implements OnInit {
  accformgrp: FormGroup;
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
    this.accformgrp = this.fb.group({
      FCaccSitusState_Action: ["",Validators.required],
      FCaccSitusState: ["",Validators.required],
      FCaccEffectiveDate: ["",Validators.required],
      FCaccEffectiveDate_Action: ["",Validators.required],
      FCaccOnOff: ["",Validators.required],
      FCaccOnOff_Action: ["",Validators.required],
      FCaccRateLevel: ["",Validators.required],
      FCaccRateLevel_Action: ["",Validators.required],

    })

  }
  // getLookupValueSitusState(value: any){
  //   this.lookupSitusStateValue = value;
  // }

  onItemChange(value){
    console.log(" Value is : ", value );
 }
}

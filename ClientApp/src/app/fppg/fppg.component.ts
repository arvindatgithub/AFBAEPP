import { Component, OnInit, Input } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { NgForm, FormControl, FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-fppg',
  templateUrl: './fppg.component.html',
  styleUrls: ['./fppg.component.css']
})
export class FPPGComponent implements OnInit {
  fppgformgrp: FormGroup
  @Input() lookupValue: any;
  @Input() dateValue: any;
  situsValue:string;
  exampleChild: string = "Harsh"
  // subscription: Subscription;
  public isLoading = false;
  lookUpDataSitusStates: any = [];
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  public minDate = new Date().toISOString().slice(0,10);

  constructor(private lookupService: LookupService, private fb:FormBuilder ) {
   
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
      FCfppgSitusState: ["",Validators.required],
      FCfppgEmpGIAmtMax: ["",Validators.required],
      FCfppgEmpQIAmtMax: ["",Validators.required],
      FCfppgSpouseGIAmtMax: ["",Validators.required],
      FCfppgSpouseQIAmtMax: ["",Validators.required],
      FCfppgSpouseMaxAmt: ["",Validators.required],
      FCfppgOpenEnrollGI: ["",Validators.required],
      FCfppgPlanCodeManualEntry: ["",Validators.required],
      FCfppgQolRiders: ["",Validators.required],
      FCfppgWaiver:["",Validators.required]
      
    });


  }

}

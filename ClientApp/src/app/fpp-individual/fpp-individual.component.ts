import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { GroupsearchService } from '../services/groupsearch.service';
import { EppCreateGrpSetupService } from '../services/epp-create-grp-setup.service';
@Component({
  selector: 'app-fpp-individual',
  templateUrl: './fpp-individual.component.html',
  styleUrls: ['./fpp-individual.component.css']
})
export class FPPIndividualComponent implements OnInit, OnChanges {
  fppiformgrp: FormGroup;
  @Input() lookupValue: any;
  @Input() dateValue: any;
  situsValue: string;
  subscription: Subscription;
  public isLoading = false;
  lookUpDataSitusStates: any = [];
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  public minDate
  situsState: any;
  latest_datefpp;
  radioButtonArr = [
    { value: '10002', name: 'Always Override' },
    { value: '10001', name: 'Update if Blank' },
    { value: '10003', name: 'Validate' }
  ];
  fppiData;
  fppiDate;
  fppiSitus;
  resetFlag = true;
  status;

  constructor(private lookupService: LookupService, private fb: FormBuilder, public datepipe: DatePipe,
    private groupsearchService: GroupsearchService, private eppservice: EppCreateGrpSetupService) {


  }

  ngOnChanges() {

    this.latest_datefpp = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');

  }

  ngOnInit() {
    this.lookUpDataSitusStates = JSON.parse(localStorage.getItem('lookUpSitusApiData'));
    this.fppiData = JSON.parse(localStorage.getItem('GroupNumApiData'));

    if (this.fppiData !== undefined) {

      if (this.fppiData.isFPPIActive) {
        this.fppiDate = this.datepipe.transform(this.fppiData.fppi.effctv_dt, 'yyyy-MM-dd');
      // }else {
      //   this.latest_datefpp = this.datepipe.transform(this.fppiData.grpEfftvDt, 'yyyy-MM-dd')=='0001-01-01' ? 
      //   '':this.datepipe.transform(this.fppiData.grpEfftvDt, 'yyyy-MM-dd');
      // }
      }
      this.fppiformgrp = this.fb.group({
        FCfppiEffectiveDate: [(this.fppiData.isFPPIActive) ? this.fppiDate : this.latest_datefpp, Validators.required],
        FCfppiEffectiveDate_Action: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.effctv_dt_action : this.radioButtonArr[1].value, Validators.required],
        FCfppiAgentSign: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.agnt_sig_txt_1 : "", Validators.required],
        FCfppiAgentSign_Action: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.agnt_sig_txt_1_action : this.radioButtonArr[1].value, Validators.required],
        FCfppiEmpGIAmtMax: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.emp_gi_max_amt : "", Validators.required],
        FCfppiEmpAmtMax_Action: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.emp_max_amt_action : this.radioButtonArr[1].value, Validators.required],
        FCfppiEmpQIAmtMax: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.emp_qi_max_amt : "", Validators.required],
        FCfppiEmpAmtMax: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.emp_max_amt : "", Validators.required],
        FCfppiSpouseGIAmtMax: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.sp_gi_max_amt : "", Validators.required],
        FCfppiSpouseQIAmtMax: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.sp_qi_max_amt : "", Validators.required],
        FCfppiSpouseMaxAmt: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.sp_max_amt : "", Validators.required],
        FCfppiSpouseAmtMax_Action: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.sp_max_amt_action : this.radioButtonArr[1].value, Validators.required],
        //FCfppiOpenEnrollGI: ["",Validators.required],
        //FCfppiOpenEnrollGI_Action: [this.radioButtonArr[1].value,Validators.required],
        FCfppiPlanCodeManualEntry_Action: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.emp_plan_cd_action : this.radioButtonArr[1].value, Validators.required],
        //FCfppiPlanCodeManualEntry: ["",Validators.required],
        FCfppiUserToken: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.user_token : "", Validators.required],
        FCfppiUserToken_Action: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.user_token_action : this.radioButtonArr[1].value, Validators.required],
        FCfppiCaseToken: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.case_token : "", Validators.required],
        FCfppiCaseToken_Action: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.case_token_action : this.radioButtonArr[1].value, Validators.required],
        FCfppiQolRiders: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.emp_quality_of_life : "", Validators.required],
        FCfppiQolRiders_Action: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.emp_quality_of_life_action : this.radioButtonArr[1].value, Validators.required],
        FCfppiWaiver_Action: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.emp_waiver_of_prem_action : this.radioButtonArr[1].value, Validators.required],
        FCfppiWaiver: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.emp_waiver_of_prem : "", Validators.required],

        FCfppiempPlanCode: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.emp_ProductCode : "", Validators.required],
        FCfppiSpousePlanCode: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.sp_ProductCode : "", Validators.required],
        FCfppiChildPlanCode: [(this.fppiData.isFPPIActive) ? this.fppiData.fppi.ch_ProductCode : "", Validators.required],

      });

      this.eppservice.castsetStatus.subscribe((data) => {
        this.status = data;
        if (this.groupsearchService.getFromSearchFlag() && this.status == '') {
          this.fppiformgrp.disable();
          this.resetFlag = true;
        } else {
          this.fppiformgrp.enable();
          this.resetFlag = false;
        }
      });


    }


  }

  onItemChange(value) {
    console.log(" Value is : ", value);
  }
  resetfpp() {
    this.fppiformgrp.reset({
      FCfppiEffectiveDate: "",
      FCfppiEffectiveDate_Action: "",
      FCfppiAgentSign: "",
      FCfppiAgentSign_Action: "",
      FCfppiEmpGIAmtMax: "",
      FCfppiEmpAmtMax_Action: "",
      FCfppiEmpQIAmtMax: "",
      FCfppiEmpAmtMax: "",
      FCfppiSpouseGIAmtMax: "",
      FCfppiSpouseQIAmtMax: "",
      FCfppiSpouseMaxAmt: "",
      FCfppiSpouseAmtMax_Action: "",
      //FCfppiOpenEnrollGI: "",
      //FCfppiOpenEnrollGI_Action: "",
      FCfppiPlanCodeManualEntry_Action: "",
      //FCfppiPlanCodeManualEntry:"",
      FCfppiUserToken: "",
      FCfppiUserToken_Action: "",
      FCfppiCaseToken: "",
      FCfppiCaseToken_Action: "",
      FCfppiQolRiders: "",
      FCfppiQolRiders_Action: "",
      FCfppiWaiver_Action: "",
      FCfppiWaiver: "",
    })
  }
}
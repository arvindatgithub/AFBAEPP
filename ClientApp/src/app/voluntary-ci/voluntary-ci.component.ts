import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { GroupsearchService } from '../services/groupsearch.service';
import { EppCreateGrpSetupService } from '../services/epp-create-grp-setup.service';

@Component({
  selector: 'app-voluntary-ci',
  templateUrl: './voluntary-ci.component.html',
  styleUrls: ['./voluntary-ci.component.css']
})
export class VoluntaryCIComponent implements OnInit,OnChanges {
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
  latest_datevolci;
  radioButtonArr=[
    {value:'10002',name:'Always Override'},
    {value:'10001',name:'Update if Blank'},
    {value:'10003',name:'Validate'}
  ];
  volCiData;
  volCiDate;
  volCiSitus;

  constructor(private lookupService: LookupService, private fb:FormBuilder,public datepipe: DatePipe,
    private groupsearchService: GroupsearchService, private eppservice:EppCreateGrpSetupService) {
      let existingSelectedGrpNbr: any;
      this.groupsearchService.castGroupNumber.subscribe(data => {
        existingSelectedGrpNbr = data; 
        console.log("BGL "+ existingSelectedGrpNbr); 
      });

      this.eppservice.getGroupNbrEppData(existingSelectedGrpNbr).subscribe(data => {
        this.volCiData = data;
        console.log('vol ci'+ JSON.stringify(this.volCiData));
        if(this.volCiData !== undefined){

          if(this.volCiData.isVOL_CIActive){
            this.volCiDate = this.datepipe.transform(this.volCiData.voL_CI.effctv_dt, 'yyyy-MM-dd');
            if(this.volCiData.voL_CI.grp_situs_state !== null){
              this.volCiSitus = this.volCiData.voL_CI.grp_situs_state;
            } else {
              this.volCiSitus = this.lookupValue;
            }
          }
          this.volCIformgrp = this.fb.group({
            FCVolCIEffectiveDate: [(this.volCiData.isVOL_CIActive) ? this.volCiDate : this.minDate,Validators.required],
            FCVolCIEffectiveDate_Action: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.effctv_dt_action : this.radioButtonArr[1].value,Validators.required],
            FCVolCISitusState: [(this.volCiData.isVOL_CIActive) ? this.volCiSitus : this.lookupValue,Validators.required],
            FCVolCISitusState_Action: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.grp_situs_state_action : this.radioButtonArr[1].value,Validators.required],
            FCVolCIEmpGIAmtMax: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.emp_gi_max_amt : "",Validators.required],
            FCVolCIEmpGIAmtMax_Action: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.emp_gi_max_amt_action : this.radioButtonArr[1].value,Validators.required],
            FCVolCIEmpQIAmtMax: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.emp_qi_max_amt : "",Validators.required],
            FCVolCIEmpAmtMax: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.emp_max_amt : "",Validators.required],
            FCVolCISpouseGIAmtMax: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.sp_gi_max_amt : "",Validators.required],
            FCVolCISpouseQIAmtMax: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.sp_qi_max_amt : "",Validators.required],
            FCVolCISpouseAmtMax: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.sp_max_amt : "",Validators.required],
            FCVolCISpouseAmtMax_Action: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.sp_max_amt_action : this.radioButtonArr[1].value,Validators.required],
            FCVolCIEmpPlanCode: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.emp_plan_cd : "",Validators.required],
            FCVolCISpousePlanCode: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.sp_plan_cd : "",Validators.required],
            FCVolCIChildPlanCode: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.ch_plan_cd : "",Validators.required],
            FCVolCIPlanCodeManualEntry_Action: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.emp_plan_cd_action : this.radioButtonArr[1].value,Validators.required],
            //FCVolCIOpenEnrollGI: ["",Validators.required],
            //FCVolCIOpenEnrollGI_Action: [this.radioButtonArr[1].value,Validators.required],
            FCVolCIEmpNTB: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.owner_smkr_no_smkr : "",Validators.required],
            FCVolCIEmpNTB_Action: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.owner_smkr_no_smkr_action : this.radioButtonArr[1].value,Validators.required],
            FCVolCIEmpTB_Action: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.owner_smkr_no_smkr_action : this.radioButtonArr[1].value,Validators.required],
            FCVolCIEmpTB: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.owner_smkr_no_smkr : "",Validators.required],
           
            FCVolCISpouseNTB: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.sp_smkr_no_smkr : "",Validators.required],
            FCVolCISpouseNTB_Action: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.sp_smkr_no_smkr_action : this.radioButtonArr[1].value,Validators.required],
            FCVolCISpouseTB_Action: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.sp_smkr_no_smkr_action : this.radioButtonArr[1].value,Validators.required],
            FCVolCISpouseTB: [(this.volCiData.isVOL_CIActive) ? this.volCiData.voL_CI.sp_smkr_no_smkr : "",Validators.required],
          });
        }
      });
     }
   
  // get myForm() {
  //   return this.volCIformgrp.get('FCVolCISitusState');
  // }
ngOnChanges(){
  this.latest_datevolci = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
  //this.myForm.setValue(this.lookupValue);
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
 volcireset(){
   this.volCIformgrp.reset({
    FCVolCIEffectiveDate: "",

    FCVolCIEmpGIAmtMax: "",
    
    FCVolCIEmpQIAmtMax: "",
    FCVolCIEmpAmtMax: "",
    FCVolCISpouseGIAmtMax: "",
    FCVolCISpouseQIAmtMax: "",
    FCVolCISpouseAmtMax: "",
  
    FCVolCIEmpPlanCode: "",
    FCVolCISpousePlanCode: "",
    FCVolCIChildPlanCode: "",
   
   
    FCVolCIEmpNTB: "",
   
    FCVolCIEmpTB: "",
    FCVolCISpouseNTB: "",
   
    FCVolCISpouseTB: "",
   })
 }
}

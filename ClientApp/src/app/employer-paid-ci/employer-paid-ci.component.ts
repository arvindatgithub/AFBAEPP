import { Component, OnInit, Input,ViewChild,OnChanges } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgentSetupComponent } from '../agent-setup/agent-setup.component';
import { DatePipe } from '@angular/common';
import { GroupsearchService } from '../services/groupsearch.service';
import { EppCreateGrpSetupService } from '../services/epp-create-grp-setup.service';
@Component({
  selector: 'app-employer-paid-ci',
  templateUrl: './employer-paid-ci.component.html',
  styleUrls: ['./employer-paid-ci.component.css']
})
export class EmployerPaidCIComponent implements OnInit ,OnChanges{
  empCIformgrp: FormGroup;
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
  latest_dateemppaisci;
  public minDate = new Date().toISOString().slice(0,10);
  latest_date;
  radioButtonArr=[
    {value:'10002',name:'Always Override'},
    {value:'10001',name:'Update if Blank'},
    {value:'10003',name:'Validate'}
  ];
  empCiData;
  empCiDate;
  empCiStatus;
  resetFlag = true;
  status;

  constructor(private lookupService: LookupService, private fb:FormBuilder,public datepipe: DatePipe,
    private groupsearchService: GroupsearchService, private eppservice:EppCreateGrpSetupService) {

   }

 
  get myForm() {
    return this.empCIformgrp.get('FCempCISitusState');
  }

  ngOnChanges(){
    
    let existingSelectedGrpNbr: any;
    this.groupsearchService.castGroupNumber.subscribe(data => {
      existingSelectedGrpNbr = data; 
      console.log("EMP-CI "+ existingSelectedGrpNbr); 
     
      this.empCiData = JSON.parse(localStorage.getItem('GroupNumApiData'));
      
      if(this.empCiData !== undefined){
          if(this.empCiData.isER_CIActive){
            this.empCiDate = this.datepipe.transform(this.empCiData.eR_CI.effctv_dt, 'yyyy-MM-dd');
            if(this.empCiData.eR_CI.grp_situs_state !== null){
              this.empCiStatus = this.empCiData.eR_CI.grp_situs_state;
            } else {
              this.empCiStatus = this.lookupValue;
            }
            
          }
  
          this.empCIformgrp = this.fb.group({
            FCempCIEffectiveDate: [(this.empCiData.isER_CIActive) ? this.empCiDate : this.minDate,Validators.required],
            FCempCIEffectiveDate_Action: [(this.empCiData.isER_CIActive) ? this.empCiData.eR_CI.effctv_dt_action : this.radioButtonArr[1].value,Validators.required],
            FCempCISitusState_Action: [(this.empCiData.isER_CIActive) ? this.empCiData.eR_CI.grp_situs_state_action : this.radioButtonArr[1].value,Validators.required],
            FCempCISitusState: [(this.empCiData.isER_CIActive) ? this.empCiStatus : this.lookupValue,Validators.required],
           
            FCempCIEmpFcAmt: [(this.empCiData.isER_CIActive) ?  this.empCiData.eR_CI.emp_face_amt_mon_bnft : "",Validators.required],
            FCempCIEmpFcAmt_Action: [(this.empCiData.isER_CIActive) ?  this.empCiData.eR_CI.emp_face_amt_mon_bnft_action : this.radioButtonArr[1].value,Validators.required],
          
            FCempCIPlanCode_Action: [(this.empCiData.isER_CIActive) ?  this.empCiData.eR_CI.emp_plan_cd_action : this.radioButtonArr[1].value,Validators.required],
        
            FCempCIEMPPlanCode: [(this.empCiData.isER_CIActive) ?  this.empCiData.eR_CI.emp_ProductCode :"",Validators.required],
            FCempCISpouseFcAmt: [(this.empCiData.isER_CIActive) ?  this.empCiData.eR_CI.sp_ProductCode : "",Validators.required],
            FCempCIChdFcAmt: [(this.empCiData.isER_CIActive) ?  this.empCiData.eR_CI.ch_ProductCode : "",Validators.required],
            
            FCempCIChdFcAmt_Action: [(this.empCiData.isER_CIActive) ?  this.empCiData.eR_CI.ch_plan_cd_action : this.radioButtonArr[1].value,Validators.required],
            FCempCISpouseFcAmt_Action:[(this.empCiData.isER_CIActive) ?  this.empCiData.eR_CI.sp_plan_cd_action : this.radioButtonArr[1].value, Validators.required]
          });
          this.status = this.eppservice.getUserStatus();
          if(this.groupsearchService.getFromSearchFlag() && this.status == ''){
            this.empCIformgrp.disable();
            this.resetFlag = true;
          }else{
            this.empCIformgrp.enable();
            this.resetFlag = false;
          }
          
         
          
        }
        
    });

    
    
    this.latest_dateemppaisci = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
   // this.myForm.setValue(this.lookupValue);
   
  }
  
  ngOnInit() {
    this.lookUpDataSitusStates = JSON.parse(localStorage.getItem('lookUpSitusApiData'));
   
  }

 
  resetEmpCi(){
    this.empCIformgrp.reset({
      FCempCIEffectiveDate: "",
      FCempCIEmpFcAmt: "",
      FCempCIEMPPlanCode:"",
      FCempCISpouseFcAmt: "",
      FCempCIChdFcAmt:"",

    })
  }

  onItemChange(value){
    console.log(" Value is : ", value );
 }
}

import { Component, OnInit, Input,ViewChild,SimpleChanges, OnChanges } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgentSetupComponent } from '../agent-setup/agent-setup.component';
import { DatePipe } from '@angular/common';
import { GroupsearchService } from '../services/groupsearch.service';
import { EppCreateGrpSetupService } from '../services/epp-create-grp-setup.service';
@Component({
  selector: 'app-basic-group-life',
  templateUrl: './basic-group-life.component.html',
  styleUrls: ['./basic-group-life.component.css']
})
export class BasicGroupLifeComponent implements OnInit,OnChanges {
  basicGrpLfformgrp: FormGroup;
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
  latest_datebasicgrplife
  public minDate = new Date().toISOString().slice(0,10);
  radioButtonArr=[
    {value:'10002',name:'Always Override'},
    {value:'10001',name:'Update if Blank'},
    {value:'10003',name:'Validate'}
  ];
   bglData;
   bglDate;
   bglStatus;
   resetFlag = true;

  constructor(private lookupService: LookupService, private fb:FormBuilder,public datepipe: DatePipe,
    private groupsearchService: GroupsearchService, private eppservice:EppCreateGrpSetupService) {


      this.eppservice.castAddEditClone.subscribe(data => {
        let status = data;
        if(status == 'Edit' || status == 'Add'){
          this.basicGrpLfformgrp.enable();
          this.resetFlag = false;
        } else {
          this.resetFlag = true;
        }
      });

      let existingSelectedGrpNbr: any;
      this.groupsearchService.castGroupNumber.subscribe(data => {
        existingSelectedGrpNbr = data; 
        console.log("BGL "+ existingSelectedGrpNbr); 
        this.eppservice.getGroupNbrEppData(existingSelectedGrpNbr).subscribe(data => {
          this.bglData = data;
          console.log('bgl'+ JSON.stringify(this.bglData));
          if(this.bglData !== undefined){
  
            if(this.bglData.isBGLActive){
              this.bglDate = this.datepipe.transform(this.bglData.bgl.effctv_dt, 'yyyy-MM-dd');
              if(this.bglData.bgl.grp_situs_state !== null){
                this.bglStatus = this.bglData.bgl.grp_situs_state;
              } else {
                this.bglStatus = this.lookupValue;
              }
            }
  
            this.basicGrpLfformgrp = this.fb.group({
              FCbasicEffectiveDate_Action: [(this.bglData.isBGLActive) ? this.bglData.bgl.effctv_dt_action : this.radioButtonArr[1].value,Validators.required],
              FCbasicEffectiveDate: [(this.bglData.isBGLActive) ? this.bglDate : this.minDate,Validators.required],
              FCbasicSitusState_Action: [(this.bglData.isBGLActive) ? this.bglData.bgl.grp_situs_state_action : this.radioButtonArr[1].value,Validators.required],
              FCbasicSitusState: [(this.bglData.isBGLActive) ? this.bglStatus : this.lookupValue,Validators.required],
              FCbasicEmpFcAmt_Action: [(this.bglData.isBGLActive) ? this.bglData.bgl.emp_face_amt_mon_bnft_action : this.radioButtonArr[1].value,Validators.required],
              FCbasicEmpFcAmt: [(this.bglData.isBGLActive) ? this.bglData.bgl.emp_face_amt_mon_bnft : "",Validators.required],
              SpouseFaceAmount: [(this.bglData.isBGLActive) ? this.bglData.bgl.sp_face_amt_mon_bnft : "",Validators.required],
              ChildFaceAmount: [(this.bglData.isBGLActive) ? this.bglData.bgl.ch_face_amt_mon_bnft_01 : "",Validators.required],
            });

            if(this.groupsearchService.getFromSearchFlag()){
              this.basicGrpLfformgrp.disable();
            }else{
              this.basicGrpLfformgrp.enable();
              this.resetFlag = false;
            }
          }
          
          });
      });

      
  }
  
  

  get myForm() {
    return this.basicGrpLfformgrp.get('FCbasicSitusState');
  }
  ngOnChanges(){
    
    this.latest_datebasicgrplife = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
   // this.myForm.setValue(this.lookupValue);
  }
  ngOnInit() {
    this.lookupService.getLookupsData()
      .subscribe((data: any) => {
        this.isLoading = true;
        console.log("data", data);
        this.lookUpDataSitusStates = data.situsState;
        // this.myForm.setValue(this.lookUpDataSitusStates[0].state);
       
      });

      //this.basicGrpLfformgrp.controls['FCbasicSitusState'].setValue(this.lookUpDataSitusStates[0].state, {onlySelf:true});

  }
 

  resetfpp(){
    this.basicGrpLfformgrp.reset({
    
      FCbasicEffectiveDate: "",
     
    
      FCbasicEmpFcAmt: "",
      SpouseFaceAmount: "",
      ChildFaceAmount: "",
    })
  }
  onItemChange(value){
    console.log(" Value is : ", value );
 }

}

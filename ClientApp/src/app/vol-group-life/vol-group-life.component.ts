import { Component, OnInit, Input,ViewChild ,OnChanges} from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgentSetupComponent } from '../agent-setup/agent-setup.component';
import { DatePipe } from '@angular/common';
import { GroupsearchService } from '../services/groupsearch.service';
import { EppCreateGrpSetupService } from '../services/epp-create-grp-setup.service';
@Component({
  selector: 'app-vol-group-life',
  templateUrl: './vol-group-life.component.html',
  styleUrls: ['./vol-group-life.component.css']
})
export class VolGroupLifeComponent implements OnInit,OnChanges {
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
  latest_datevolgrplife;
  radioButtonArr=[
    {value:'10002',name:'Always Override'},
    {value:'10001',name:'Update if Blank'},
    {value:'10003',name:'Validate'}
  ];
  volGrpData;
  volGrpDate;
  volGrpSitus;
  resetFlag = true;

  constructor(private lookupService: LookupService, private fb:FormBuilder,public datepipe: DatePipe,
    private groupsearchService: GroupsearchService, private eppservice:EppCreateGrpSetupService) {

      this.eppservice.castAddEditClone.subscribe(data => {
        let status = data;
        if(status == 'Edit' || status == 'Add'){
          this.volGrpLfformgrp.enable();
          this.resetFlag = false;
        } else {
          this.resetFlag = true;
        }
      });

    let existingSelectedGrpNbr: any;
      this.groupsearchService.castGroupNumber.subscribe(data => {
        existingSelectedGrpNbr = data; 
        console.log("VGL "+ existingSelectedGrpNbr); 
        this.eppservice.getGroupNbrEppData(existingSelectedGrpNbr).subscribe(data => {
          this.volGrpData = data;
          console.log('bgl'+ JSON.stringify(this.volGrpData));
          if(this.volGrpData !== undefined){
  
            if(this.volGrpData.isVGLActive){
              this.volGrpDate = this.datepipe.transform(this.volGrpData.vgl.effctv_dt, 'yyyy-MM-dd');
              if(this.volGrpData.vgl.grp_situs_state !== null){
                this.volGrpSitus = this.volGrpData.vgl.grp_situs_state;
              } else {
                this.volGrpSitus = this.lookupValue;
              }
            }
            this.volGrpLfformgrp = this.fb.group({
              FCVolGrpLfEffectiveDate: [(this.volGrpData.isVGLActive) ? this.volGrpDate : this.minDate,Validators.required],
              FCVolGrpLfEffectiveDate_Action: [(this.volGrpData.isVGLActive) ? this.volGrpData.vgl.effctv_dt_action : this.radioButtonArr[1].value,Validators.required],
              FCVolGrpLfSitusState_Action: [(this.volGrpData.isVGLActive) ? this.volGrpData.vgl.grp_situs_state_action : this.radioButtonArr[1].value,Validators.required],
              FCVolGrpLfSitusState: [(this.volGrpData.isVGLActive) ? this.volGrpSitus : this.lookupValue,Validators.required],
              FCVolGrpLfEmpAmtMax_Action: [(this.volGrpData.isVGLActive) ? this.volGrpData.vgl.emp_max_amt_action : this.radioButtonArr[1].value,Validators.required],
              FCVolGrpLfEmpGIAmtMax: [(this.volGrpData.isVGLActive) ? this.volGrpData.vgl.emp_gi_max_amt : "",Validators.required],
              FCVolGrpLfEmpAmtMax: [(this.volGrpData.isVGLActive) ? this.volGrpData.vgl.emp_max_amt : "",Validators.required],
              FCVolGrpLfSpouseAmtMax_Action: [(this.volGrpData.isVGLActive) ? this.volGrpData.vgl.sp_max_amt_action : this.radioButtonArr[1].value,Validators.required],
              FCVolGrpLfSpouseGIAmtMax: [(this.volGrpData.isVGLActive) ? this.volGrpData.vgl.sp_gi_max_amt : "",Validators.required],
              FCVolGrpLfSpouseMaxAmt: [(this.volGrpData.isVGLActive) ? this.volGrpData.vgl.sp_max_amt : "",Validators.required],
             // FCVolGrpLfOpenEnrollGI_Action: [(this.volGrpData.isVGLActive) ? this.volGrpData.vgl: this.radioButtonArr[1].value,Validators.required],
             // FCVolGrpLfOpenEnrollGI: ["",Validators.required],
              // FCVolGrpLfPlanCodeManualEntry_Action: [this.radioButtonArr[1].value,Validators.required],
              // // FCVolGrpLfPlanCodeManualEntry: ["",Validators.required],
              // FCVolGrpLfEmployeePlanCode: ["",Validators.required],
              // FCVolGrpLfSpousePlanCode: ["",Validators.required],
              // FCVolGrpLfChildPlanCode: ["",Validators.required],
              // FCVolGrpLfUserToken_Action: [this.radioButtonArr[1].value,Validators.required],
              // FCVolGrpLfUserToken: ["",Validators.required],
              // FCVolGrpLfCaseToken_Action: [this.radioButtonArr[1].value,Validators.required],
              // FCVolGrpLfCaseToken: ["",Validators.required],
            });

            if(this.groupsearchService.getFromSearchFlag()){
              this.volGrpLfformgrp.disable();
            }else{
              this.volGrpLfformgrp.enable();
              this.resetFlag = false;
            }
          }
        });
      });

      

  }
  // get myForm() {
  //   return this.volGrpLfformgrp.get('FCVolGrpLfSitusState');
  // }
  ngOnChanges(){
   
    this.latest_datevolgrplife = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
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

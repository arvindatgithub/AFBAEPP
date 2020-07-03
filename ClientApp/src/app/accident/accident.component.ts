import { Component, OnInit, Input,ViewChild,OnChanges,SimpleChanges } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { GroupsearchService } from '../services/groupsearch.service';
import { EppCreateGrpSetupService } from '../services/epp-create-grp-setup.service';

@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.css']
})
export class AccidentComponent implements OnInit,OnChanges {
  //@ViewChild('agent',{static:false}) agentComponent: AgentSetupComponent;
  accformgrp: FormGroup;
  @Input() lookupValue: any;
  @Input() dateValue: any;
  situsValue:string;
  public isLoading = false;
  lookUpDataSitusStates: any = [];
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  latest_dateaccident;
  public minDate = new Date().toISOString().slice(0,10);
  latest_date;
  radioButtonArr=[
    {value:'10002',name:'Always Override'},
    {value:'10001',name:'Update if Blank'},
    {value:'10003',name:'Validate'}
  ]
  jobs =  [{name: 'On the Job Only', abbrev: 'on'},
  {name: 'Off the Job Only', abbrev: 'off'},
  {name: 'both', abbrev: 'noupdate'}];

  Rate =  [
  {no: '0', abb: 'Select'},
  {no: '1', abb: '1'},
  {no: '2', abb: '2'},
  {no: '3', abb: '3'}];
 // FCaccOnOff
 accidentData: any;
 accidentDate;
 accidentSitus;
 on_off;
 rate_level;
 resetFlag = true;
 ch_fname_01;
  ch_dob_01;
  ch_gndr_01;
  sp_fname;
  sp_dob;
  sp_gndr;

  constructor(private lookupService: LookupService, private fb:FormBuilder, public datepipe: DatePipe,
    private groupsearchService: GroupsearchService, private eppservice:EppCreateGrpSetupService) {

      this.eppservice.castAddEditClone.subscribe(data => {
        let status = data;
        if(status == 'Edit' || status == 'Add'){
          this.accformgrp.enable();
          this.resetFlag = false;
        } else {
          this.resetFlag = true;
        }
      });

      let existingSelectedGrpNbr: any;
      this.groupsearchService.castGroupNumber.subscribe(data => {
        existingSelectedGrpNbr = data; 
        console.log("Accident "+ existingSelectedGrpNbr); 
        this.eppservice.getGroupNbrEppData(existingSelectedGrpNbr).subscribe(data => {
          this.accidentData = data;
          
          console.log('acc'+ JSON.stringify(data));
          
          //this.minDate = this.datepipe.transform(this.groupsfppgData.fppg.effctv_dt, 'yyyy-MM-dd');
          if(this.accidentData !== undefined){
            if(this.accidentData.isACC_HIActive){
              this.accidentDate = this.datepipe.transform(this.accidentData.acC_HI.effctv_dt, 'yyyy-MM-dd');
              if(this.accidentData.acC_HI.grp_situs_state !== null){
                this.accidentSitus = this.accidentData.acC_HI.grp_situs_state;
              } else {
                this.accidentSitus = this.lookupValue;
              }
              if(this.accidentData.acC_HI.sp_smkr_no_smkr !== null){
                this.on_off = this.accidentData.acC_HI.sp_smkr_no_smkr;
              } else {
                this.on_off = this.jobs[2].abbrev;
              }
              if(this.accidentData.acC_HI.rate_lvl !== null){
                this.rate_level = this.accidentData.acC_HI.rate_lvl;
              } else {
                this.rate_level = this.Rate[0].no;
              }
              this.sp_fname = this.accidentData.acC_HI.sp_fname == 1 ? true : false;
              this.sp_dob = this.accidentData.acC_HI.sp_dob == 1 ? true : false;
              this.sp_gndr = this.accidentData.acC_HI.sp_gndr == 1 ? true : false;

              this.ch_fname_01 = this.accidentData.acC_HI.ch_fname_01 == 1 ? true : false;
              this.ch_dob_01 = this.accidentData.acC_HI.ch_dob_01 == 1 ? true : false;
              this.ch_gndr_01 = this.accidentData.acC_HI.ch_gndr_01 == 1 ? true : false;
            }
  
            this.accformgrp = this.fb.group({
              FCaccSitusState_Action: [(this.accidentData.isACC_HIActive) ? this.accidentData.acC_HI.grp_situs_state_action : this.radioButtonArr[1].value,Validators.required],
              FCaccSitusState: [(this.accidentData.isACC_HIActive) ? this.accidentSitus : this.lookupValue,Validators.required],
              FCaccEffectiveDate: [(this.accidentData.isACC_HIActive) ? this.accidentDate : this.minDate,Validators.required],
              FCaccEffectiveDate_Action: [(this.accidentData.isACC_HIActive) ? this.accidentData.acC_HI.effctv_dt_action : this.radioButtonArr[1].value,Validators.required],
              FCaccOnOff: [(this.accidentData.isACC_HIActive) ? this.on_off : this.jobs[2].abbrev,Validators.required],
              FCaccOnOff_Action: [(this.accidentData.isACC_HIActive) ? this.accidentData.acC_HI.sp_smkr_no_smkr_action : this.radioButtonArr[1].value,Validators.required],
              FCaccRateLevel: [(this.accidentData.isACC_HIActive) ? this.rate_level : this.Rate[0].no,Validators.required],
              FCaccRateLevel_Action: [(this.accidentData.isACC_HIActive) ? this.accidentData.acC_HI.rate_lvl_action : this.radioButtonArr[1].value,Validators.required],
              FcaccChildName: [(this.accidentData.isACC_HIActive) ? this.ch_fname_01 : false,Validators.required],
              FcaccChildDOB: [(this.accidentData.isACC_HIActive) ? this.ch_dob_01 : false,Validators.required],
              FcaccChildGender: [(this.accidentData.isACC_HIActive) ? this.ch_gndr_01 : false,Validators.required],
              FcaccSpouseName: [(this.accidentData.isACC_HIActive) ? this.sp_fname : false,Validators.required],
              FcaccSpouseDOB: [(this.accidentData.isACC_HIActive) ? this.sp_dob : false,Validators.required],
              FcaccSpouseGender: [(this.accidentData.isACC_HIActive) ? this.sp_gndr : false,Validators.required],
             
            });
            if(this.groupsearchService.getFromSearchFlag()){
              this.accformgrp.disable();
            } else{
              this.accformgrp.enable();
              this.resetFlag = false;
            }
          }
          });
      });

      
     }

 
  get myForm() {
    return this.accformgrp.get('FCaccSitusState');
  }
  ngOnChanges(){
   
    this.latest_dateaccident = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
  }


  ngOnInit() {
    this.lookupService.getLookupsData()
    .subscribe((data: any) => {
      this.isLoading = true;
      console.log("data", data);
      this.lookUpDataSitusStates = data.situsState;
      // this.myForm.setValue(this.lookUpDataSitusStates[0].state);
       this.latest_dateaccident = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
    }); 
   
  }
  resetAcc(){
    this.accformgrp.reset({
      
      FCaccEffectiveDate: "",
     
      FCaccOnOff: "",
      FCaccOnOff_Action: "",
      FCaccRateLevel: "",
    

    })
  }
  
}

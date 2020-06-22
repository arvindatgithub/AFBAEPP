import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { LookupService } from '../services/lookup.service';
import { ThemePalette } from '@angular/material';
import { EppCreateGrpSetupService } from '../services/epp-create-grp-setup.service';
import { AgentSetupComponent } from '../agent-setup/agent-setup.component';
import { FPPGComponent } from '../fppg/fppg.component';
import {RadioButtonComponent} from '../radio-button/radio-button.component'
@Component({
  selector: 'app-group-setup',
  templateUrl: './group-setup.component.html',
  styleUrls: ['./group-setup.component.css']
})
export class GroupSetupComponent implements OnInit {
  @ViewChild(AgentSetupComponent,{static:false}) agentComponent: AgentSetupComponent;
  // @ViewChild('radio',{static:false}) radiobutton:RadioButtonComponent;
  @ViewChild('child',{static:false}) fppgComponent: FPPGComponent;
  public product: any;
  public addedProducts = [];
  public selectedProducts: any = [];
  titleName: string = "";
  selectedOption = [];
  accident:string = "";
  checkedToggle: string = "Inactive";
  checkedToggleProduct: string = "Inactive";
  toggleActiveColor: ThemePalette = "primary";
  groupNumber:string = "";
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  public minDate = new Date().toISOString().slice(0, 10);
  dateChange: any;
  fppg: any;
  hospitalIndemity: any;
  fppIndivisual: any;
  employerPaidCi: any;
  voluntaryCi: any;
  volGroup: any;
  basicGroup: any;
  lookUpDataPaymentModes: any = [];
  lookUpDataSitusStates: any = [];
  public lookupPaymentMethodvalue = "";
  public lookupSitusStateValue = "";
  public isLoading = false;
  groupName: string = "";
  grpEfftvDate;
  grpPymn: string;
  occClass: any = [{
    occupation: 1,
    id:1
  },
  {
    occupation: 2,
    id:2
  },
  {
    occupation: 3,
    id:3
  },
  {
    occupation: 4,
    id:4
  },
  {
    occupation: 5,
    id:5
  },
  {
    occupation: 6,
    id:6
  },
  {
    occupation: 7,
    id:7
  },
  {
    occupation: 8,
    id:8
  },
  {
    occupation: 9,
    id:9
  },
  {
    occupation: 10,
    id:10
  },];
  occupationArray: any= [];
  grpSitusState: string = "";
  
  EnrolmentPatnerName: string ="";
  EnrolEmailAddress: string ="";
  ManagerEmail: string="";
  ManegerName: string="";
  activeflag: string="";
  fppgActive: boolean;
  empGiMaxAmt: string= "";
  SpGiMaxAmount: string= "";
  EmpQiMaxAmount: string= "";
  SpQiMaxAmount: string="";
  EmpMaxAmt: string="";
  SpMaxAmount: string="";
  effctvDateAction: string="";
  grpSitusStateAction: string="";
  empGiMaxAmtAction: string="";
  eppData: any;
 

  constructor(private eppcreategroupservice: EppCreateGrpSetupService,
     private snackBar: MatSnackBar, private lookupService: LookupService,
     private httpClient:HttpClient) {
  }

  

  ngOnInit() {
    this.lookupService.getLookupsData()
      .subscribe((data: any) => {
        this.isLoading = true;
        console.log("data", data);
        this.lookUpDataPaymentModes = (data.paymentMode.map((payment) => {
          return payment.formattedData;
        }));
        this.lookUpDataSitusStates = (data.situsState);
        this.grpPymn = this.lookUpDataPaymentModes[5];
        this.grpSitusState = this.lookUpDataSitusStates[0].state;
      });
       this.eppcreategroupservice.myEppData.subscribe((data:any)=>{
        this.eppData = data;
        console.log("this.eppData",this.eppData);
      });
      
  }

  // ngAfterViewInit(){
  //   let fppgData = this.fppgDataInput.exampleChild;
  //   console.log("fppgData",fppgData);
  // }

  addProducts() {
    this.selectedOption.findIndex((ele, i) => {
      if (this.addedProducts.indexOf(ele) == i) {
        this.snackBar.open(this.addedProducts + " " + "Already Added", 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['red-snackbar']
        });
      }
      else {
        this.addedProducts = [...this.selectedOption];
        this.snackBar.open(this.addedProducts + " " + "Added Successfully", 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['blue-snackbar']
        });
      }
    });

  }
  deleteProduct(product) {
    if (this.addedProducts.indexOf(product) > -1) {
      this.addedProducts.splice(this.addedProducts.indexOf(product), 1);
    }
  }

  getLookupValuePaymentMode(value: any) {
    this.lookupPaymentMethodvalue = value;
    this.grpPymn = value;
  }

  getLookupValueSitusState(value: any) {
    this.lookupSitusStateValue = value;
    this.grpSitusState = value;
  }

  onDateChange(dateValue: any) {
    this.dateChange = dateValue.srcElement.value;
    console.log("dateValue", this.dateChange);
  }

  toggleChange(event: any) {

    if (event.checked) {
      this.checkedToggle = "Active";
    }
    else {
      this.checkedToggle = "Inactive";
    }

  }

  toggleChangeProduct(event: any) {

    if (event.checked) {
      this.checkedToggleProduct = "Active";
    }
    else {
      this.checkedToggleProduct = "Inactive";
    }

  }

  occClassChange(value:any){
    this.occupationArray = value;
    // this.occClass = value;
    console.log("this.occupationArray",this.occupationArray);
  }

  onSubmit() {
    // console.log("inputText", this.agentComponent.text);

    // let eppbody = {
    //   grpNbr: this.groupNumber,
    //   grpNm: this.groupName,
    //   grpEfftvDt: this.grpEfftvDate,
    //   grpPymn: this.grpPymn,
    //   actvFlg: this.checkedToggle,
    //   occClass: this.occClass,
    //   grpSitusSt: this.grpSitusState,
    //   enrlmntPrtnrsNm: this.EnrolmentPatnerName,
    //   emlAddrss: this.EnrolEmailAddress,
    //   emailAddress: this.ManagerEmail,
    //   acctMgrNm: this.ManegerName,


    // }
    // console.log(eppbody)
let body = {
        "grpId": 0,
        grpNbr: this.groupNumber.toString(),
        grpNm: this.groupName,
        grpEfftvDt: this.grpEfftvDate,
        // grpPymn: parseInt(this.grpPymn.slice(0,2)),
        grpPymn: "10001",
        //actvFlg: this.checkedToggle,
        "actvFlg": "false",
        occClass: parseInt(this.occupationArray),
        grpSitusSt: this.grpSitusState,
        enrlmntPrtnrsNm: this.EnrolmentPatnerName,
        emlAddrss: this.EnrolEmailAddress,
        emailAddress: this.ManagerEmail,
        acctMgrNm: this.ManegerName,
        "acctMgrCntctId": 0,
        isFPPGActive: this.fppgActive,
        "fppg": {
          "grp_nmbr": "string",
          effctv_dt: this.fppgComponent.fppgformgrp.value.FCfppgEffectiveDate,
          grp_situs_state: this.fppgComponent.fppgformgrp.value.FCfppgSitusState,
          emp_gi_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgEmpGIAmtMax,
          sp_gi_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgSpouseGIAmtMax,
          emp_qi_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgEmpQIAmtMax,
          sp_qi_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgSpouseQIAmtMax,
          emp_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgEmpGIAmtMax,
          sp_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgSpouseMaxAmt,
          effctv_dt_action: this.eppData,
          grp_situs_state_action: this.fppgComponent.fppgformgrp.value.FCfppgSpouseMaxAmt,
          emp_gi_max_amt_action: this.fppgComponent.fppgformgrp.value.FCfppgSpouseMaxAmt,
          "sp_gi_max_amt_action": "string",
          "emp_qi_max_amt_action": "string",
          "sp_qi_max_amt_action": "string",
          "emp_max_amt_action": "string",
          "sp_max_amt_action": "string",
          "agnt_cd_1": "string",
          "agnt_nm": "string",
          "agnt_comm_split_1": 0,
          "agntsub_1": "string",
          "agnt_cd_2": "string",
          "agnt_comm_split_2": 0,
          "agntsub_2": "string",
          "agnt_cd_3": "string",
          "agnt_comm_split_3": 0,
          "agntsub_3": "string",
          "agnt_cd_4": "string",
          "agnt_comm_split_4": 0,
          "agntsub_4": "string"
        },
        "isACC_HIActive": false,
        "acC_HI": {
          "effctv_dt": "2020-06-21T12:03:45.088Z",
          "grp_situs_state": "string",
          "rate_lvl": "string",
          "effctv_dt_action": "string",
          "grp_situs_state_action": "string",
          "rate_lvl_action": "string",
          "agnt_cd_1": "string",
          "agnt_nm": "string",
          "agnt_comm_split_1": 0,
          "agntsub_1": "string",
          "agnt_cd_2": "string",
          "agnt_comm_split_2": 0,
          "agntsub_2": "string",
          "agnt_cd_3": "string",
          "agnt_comm_split_3": 0,
          "agntsub_3": "string",
          "agnt_cd_4": "string",
          "agnt_comm_split_4": 0,
          "agntsub_4": "string"
        },
        "isER_CIActive": false,
        "eR_CI": {
          "grp_nmbr": "string",
          "effctv_dt": "2020-06-21T12:03:45.088Z",
          "grp_situs_state": "string",
          "emp_face_amt_mon_bnft": "string",
          "sp_face_amt_mon_bnft": "string",
          "effctv_dt_action": "string",
          "grp_situs_state_action": "string",
          "emp_face_amt_mon_bnft_action": "string",
          "sp_face_amt_mon_bnft_action": "string",
          "agnt_cd_1": "string",
          "agnt_nm": "string",
          "agnt_comm_split_1": 0,
          "agntsub_1": "string",
          "agnt_cd_2": "string",
          "agnt_comm_split_2": 0,
          "agntsub_2": "string",
          "agnt_cd_3": "string",
          "agnt_comm_split_3": 0,
          "agntsub_3": "string",
          "agnt_cd_4": "string",
          "agnt_comm_split_4": 0,
          "agntsub_4": "string"
        },
        "isVOL_CIActive": false,
        "voL_CI": {
          "grp_nmbr": "string",
          "effctv_dt": "2020-06-21T12:03:45.088Z",
          "grp_situs_state": "string",
          "emp_gi_max_amt": "string",
          "sp_gi_max_amt": "string",
          "emp_qi_max_amt": "string",
          "sp_qi_max_amt": "string",
          "emp_max_amt": "string",
          "sp_max_amt": "string",
          "effctv_dt_action": "string",
          "grp_situs_state_action": "string",
          "emp_gi_max_amt_action": "string",
          "sp_gi_max_amt_action": "string",
          "emp_qi_max_amt_action": "string",
          "sp_qi_max_amt_action": "string",
          "emp_max_amt_action": "string",
          "sp_max_amt_action": "string",
          "agnt_cd_1": "string",
          "agnt_nm": "string",
          "agnt_comm_split_1": 0,
          "agntsub_1": "string",
          "agnt_cd_2": "string",
          "agnt_comm_split_2": 0,
          "agntsub_2": "string",
          "agnt_cd_3": "string",
          "agnt_comm_split_3": 0,
          "agntsub_3": "string",
          "agnt_cd_4": "string",
          "agnt_comm_split_4": 0,
          "agntsub_4": "string"
        },
        "isVGLActive": false,
        "vgl": {
          "grp_nmbr": "string",
          "effctv_dt": "2020-06-21T12:03:45.088Z",
          "grp_situs_state": "string",
          "emp_gi_max_amt": "string",
          "sp_gi_max_amt": "string",
          "emp_qi_max_amt": "string",
          "sp_qi_max_amt": "string",
          "emp_max_amt": "string",
          "sp_max_amt": "string",
          "effctv_dt_action": "string",
          "grp_situs_state_action": "string",
          "emp_gi_max_amt_action": "string",
          "sp_gi_max_amt_action": "string",
          "emp_qi_max_amt_action": "string",
          "sp_qi_max_amt_action": "string",
          "emp_max_amt_action": "string",
          "sp_max_amt_action": "string",
          "agnt_cd_1": "string",
          "agnt_nm": "string",
          "agnt_comm_split_1": 0,
          "agntsub_1": "string",
          "agnt_cd_2": "string",
          "agnt_comm_split_2": 0,
          "agntsub_2": "string",
          "agnt_cd_3": "string",
          "agnt_comm_split_3": 0,
          "agntsub_3": "string",
          "agnt_cd_4": "string",
          "agnt_comm_split_4": 0,
          "agntsub_4": "string"
        },
        "isBGLActive": false,
        "bgl": {
          "grp_nmbr": "string",
          "effctv_dt": "2020-06-21T12:03:45.089Z",
          "grp_situs_state": "string",
          "emp_face_amt_mon_bnft": "string",
          "effctv_dt_action": "string",
          "grp_situs_state_action": "string",
          "emp_face_amt_mon_bnft_action": "string",
          "agnt_cd_1": "string",
          "agnt_nm": "string",
          "agnt_comm_split_1": 0,
          "agntsub_1": "string",
          "agnt_cd_2": "string",
          "agnt_comm_split_2": 0,
          "agntsub_2": "string",
          "agnt_cd_3": "string",
          "agnt_comm_split_3": 0,
          "agntsub_3": "string",
          "agnt_cd_4": "string",
          "agnt_comm_split_4": 0,
          "agntsub_4": "string"
        },
        "isFPPIActive": false,
        "fppi": {
          "grp_nmbr": "string",
          "effctv_dt": "2020-06-21T12:03:45.089Z",
          "grp_situs_state": "string",
          "emp_gi_max_amt": "string",
          "sp_gi_max_amt": "string",
          "emp_qi_max_amt": "string",
          "sp_qi_max_amt": "string",
          "emp_max_amt": "string",
          "sp_max_amt": "string",
          "effctv_dt_action": "string",
          "grp_situs_state_action": "string",
          "emp_gi_max_amt_action": "string",
          "sp_gi_max_amt_action": "string",
          "emp_qi_max_amt_action": "string",
          "sp_qi_max_amt_action": "string",
          "emp_max_amt_action": "string",
          "sp_max_amt_action": "string",
          "agnt_cd_1": "string",
          "agnt_nm": "string",
          "agnt_comm_split_1": 0,
          "agntsub_1": "string",
          "agnt_cd_2": "string",
          "agnt_comm_split_2": 0,
          "agntsub_2": "string",
          "agnt_cd_3": "string",
          "agnt_comm_split_3": 0,
          "agntsub_3": "string",
          "agnt_cd_4": "string",
          "agnt_comm_split_4": 0,
          "agntsub_4": "string"
        }
      

      }
      this.eppcreategroupservice.PosteppCreate(body).subscribe((data:any)=>{
        console.log("data",data);
      });
    }
  
}

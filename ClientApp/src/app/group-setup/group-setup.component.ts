import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { LookupService } from '../services/lookup.service';
import { ThemePalette } from '@angular/material';
import { EppCreateGrpSetupService } from '../services/epp-create-grp-setup.service';
import { AgentSetupComponent } from '../agent-setup/agent-setup.component';
import { FPPGComponent } from '../fppg/fppg.component';
import { RadioButtonComponent } from '../radio-button/radio-button.component'
import { FPPIndividualComponent } from '../fpp-individual/fpp-individual.component';
import{ AccidentComponent} from '../accident/accident.component';
import{HospitalIndemnityComponent} from '../hospital-indemnity/hospital-indemnity.component';
import{EmployerPaidCIComponent} from '../employer-paid-ci/employer-paid-ci.component';
import { VoluntaryCIComponent } from '../voluntary-ci/voluntary-ci.component';
import {VolGroupLifeComponent} from '../vol-group-life/vol-group-life.component';
import {BasicGroupLifeComponent} from '../basic-group-life/basic-group-life.component'

@Component({
  selector: 'app-group-setup',
  templateUrl: './group-setup.component.html',
  styleUrls: ['./group-setup.component.css']
})
export class GroupSetupComponent implements OnInit {

 // @ViewChild('agent', { static: false }) agentComponent: AgentSetupComponent;
  @ViewChild('child', { static: false }) fppgComponent: FPPGComponent;
  @ViewChild('child', { static: false }) fppComponent: FPPIndividualComponent;
  @ViewChild('child', { static: false }) accidentComponent: AccidentComponent;
  @ViewChild('child', { static: false }) hospitalIndemnityComponent: HospitalIndemnityComponent;
  @ViewChild('child', { static: false }) empPaidCiComponent: EmployerPaidCIComponent;
  @ViewChild('child', { static: false }) VolCiComponent: VoluntaryCIComponent;
  @ViewChild('child', { static: false }) VolgrpLifeComponent: VolGroupLifeComponent;
  @ViewChild('child', { static: false }) basicgrplifeComponent: BasicGroupLifeComponent;

  public product: any;
  public addedProducts = [];
  public selectedProducts: any = [];
  titleName: string = "";
  selectedOption = [];
  accident: string = "";
  isChecked = true;
  isCheckedFppg = true;
  isCheckedFppInd = true;
  isCheckedAccident= true;
  isCheckedHospital= true;
  isCheckedEmpPaidCi = true;
  isCheckedVolutaryCi = true;
  isCheckedVolGrpLife = true;
  isCheckedBasicGrpLife = true;
  checkedToggle: string = "Active";
  checkedToggleProduct: string = "Active";
  toggleActiveColor: ThemePalette = "primary";
  groupNumber: string = "";
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  public minDate = new Date().toISOString().slice(0, 10);
  dateChange;
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
  sum = 0;
  occClass: any = [{
    occupation: 1,
    id: 1
  },
  {
    occupation: 2,
    id: 2
  },
  {
    occupation: 3,
    id: 3
  },
  {
    occupation: 4,
    id: 4
  },
  {
    occupation: 5,
    id: 5
  },
  {
    occupation: 6,
    id: 6
  },
  {
    occupation: 7,
    id: 7
  },
  {
    occupation: 8,
    id: 8
  },
  {
    occupation: 9,
    id: 9
  },
  {
    occupation: 10,
    id: 10
  },
  {
    occupation: 11,
    id: 11
  },
  {
    occupation: 12,
    id: 12
  },
  {
    occupation: 13,
    id: 13
  },
  {
    occupation: 14,
    id: 14
  }, {
    occupation: 15,
    id: 15
  },
]
  occupationArray: any = [];
  grpSitusState: string = "";
  EnrolmentPatnerName: string = "";
  EnrolEmailAddress: string = "";
  ManagerEmail: string = "";
  ManegerName: string = "";
  activeflag: string = "";
  fppgActive: boolean;
  empGiMaxAmt: string = "";
  SpGiMaxAmount: string = "";
  EmpQiMaxAmount: string = "";
  SpQiMaxAmount: string = "";
  EmpMaxAmt: string = "";
  SpMaxAmount: string = "";
  effctvDateAction: string = "";
  grpSitusStateAction: string = "";
  empGiMaxAmtAction: string = "";
  eppData: any;
  eppgetwhole: any;
  agentformgrp: FormGroup;
  agentNumber_0:any = "";
  agentNumber_1:any = "";
  agentNumber_2:any = "";
  agentNumber_3:any = "";
  agentSubCount_0:any = "";
  agentSubCount_1:any = "";
  agentSubCount_2:any = "";
  agentSubCount_3:any = "";
  agentCommissionSPlit_0:string;
  agentCommissionSPlit_1:string;
  agentCommissionSPlit_2:string;
  agentCommissionSPlit_3:string;
  agent_name:any=""
  paymentModes: any;
  constructor(private eppcreategroupservice: EppCreateGrpSetupService, private _fb: FormBuilder,
    private snackBar: MatSnackBar, private lookupService: LookupService) {
  }

  ngOnInit() {
    this.lookupService.getLookupsData()
      .subscribe((data: any) => {
        this.isLoading = true;

        this.lookUpDataPaymentModes = (data.paymentMode.map((payment) => {
          return payment.formattedData;
        }));
        this.lookUpDataSitusStates = (data.situsState);
        this.grpPymn = this.lookUpDataPaymentModes[5];
        this.grpSitusState = this.lookUpDataSitusStates[0].state;
      });
    // this.eppcreategroupservice.myEppData.subscribe((data: any) => {
    //   console.log("radio",data);
    //   this.eppData = (data);

    // });
    this.lookupService.getPaymentMode().subscribe((data:any) => {
      this.paymentModes = data;
    });
    this.eppcreategroupservice.getepp().subscribe((data: any) => {
      console.log("radioBUttonData",data)
      this.eppgetwhole = data;
    }
    );

    this.agentformgrp = this._fb.group({
      AgentNumber: ["",Validators.required ],
      AgentSubCount: ["",Validators.required ],
      CommissonSplit: ["",Validators.required ],
      AgentName:["", Validators.required],

      AgentNumber1: ["",Validators.required ],
      AgentSubCount1: ["",Validators.required ],
      CommissonSplit1: ["",Validators.required ],
     

      AgentNumber2: ["",Validators.required ],
      AgentSubCount2: ["",Validators.required ],
      CommissonSplit2: ["",Validators.required ],

      AgentNumber3: ["",Validators.required ],
      AgentSubCount3: ["",Validators.required ],
      CommissonSplit3: ["",Validators.required ],


      AgentNumberFppIndivisual: ["",Validators.required ],
      AgentSubCountFppIndivisual: ["",Validators.required ],
      CommissonSplitFppIndivisual: ["",Validators.required ],
      AgentNameFppIndivisual:["", Validators.required],

      AgentNumber1FppIndivisual: ["",Validators.required ],
      AgentSubCount1FppIndivisual: ["",Validators.required ],
      CommissonSplit1FppIndivisual: ["",Validators.required ],
     

      AgentNumber2FppIndivisual: ["",Validators.required ],
      AgentSubCount2FppIndivisual: ["",Validators.required ],
      CommissonSplit2FppIndivisual: ["",Validators.required ],

      AgentNumber3FppIndivisual: ["",Validators.required ],
      AgentSubCount3FppIndivisual: ["",Validators.required ],
      CommissonSplit3FppIndivisual: ["",Validators.required ],


      AgentNumberaccident: ["",Validators.required ],
      AgentSubCountaccident: ["",Validators.required ],
      CommissonSplitaccident: ["",Validators.required ],
      AgentNameaccident:["", Validators.required],

      AgentNumber1accident: ["",Validators.required ],
      AgentSubCount1accident: ["",Validators.required ],
      CommissonSplit1accident: ["",Validators.required ],
     

      AgentNumber2accident: ["",Validators.required ],
      AgentSubCount2accident: ["",Validators.required ],
      CommissonSplit2accident: ["",Validators.required ],

      AgentNumber3accident: ["",Validators.required ],
      AgentSubCount3accident: ["",Validators.required ],
      CommissonSplit3accident: ["",Validators.required ],



      AgentNumberHospitalIndemnity: ["",Validators.required ],
      AgentSubCountHospitalIndemnity: ["",Validators.required ],
      CommissonSplitHospitalIndemnity: ["",Validators.required ],
      AgentNameHospitalIndemnity:["", Validators.required],

      AgentNumber1HospitalIndemnity: ["",Validators.required ],
      AgentSubCount1HospitalIndemnity: ["",Validators.required ],
      CommissonSplit1HospitalIndemnity: ["",Validators.required ],
     

      AgentNumber2HospitalIndemnity: ["",Validators.required ],
      AgentSubCount2HospitalIndemnity: ["",Validators.required ],
      CommissonSplit2HospitalIndemnity: ["",Validators.required ],

      AgentNumber3HospitalIndemnity: ["",Validators.required ],
      AgentSubCount3HospitalIndemnity: ["",Validators.required ],
      CommissonSplit3HospitalIndemnity: ["",Validators.required ],



      AgentNumberempPaidci: ["",Validators.required ],
      AgentSubCountempPaidci: ["",Validators.required ],
      CommissonSplitempPaidci: ["",Validators.required ],
      AgentNameempPaidci:["", Validators.required],

      AgentNumber1empPaidci: ["",Validators.required ],
      AgentSubCount1empPaidci: ["",Validators.required ],
      CommissonSplit1empPaidci: ["",Validators.required ],
     

      AgentNumber2empPaidci: ["",Validators.required ],
      AgentSubCount2empPaidci: ["",Validators.required ],
      CommissonSplit2empPaidci: ["",Validators.required ],

      AgentNumber3empPaidci: ["",Validators.required ],
      AgentSubCount3empPaidci: ["",Validators.required ],
      CommissonSplit3empPaidci: ["",Validators.required ],




      AgentNumbervolCi: ["",Validators.required ],
      AgentSubCountvolCi: ["",Validators.required ],
      CommissonSplitvolCi: ["",Validators.required ],
      AgentNamevolCi:["", Validators.required],

      AgentNumber1volCi: ["",Validators.required ],
      AgentSubCount1volCi: ["",Validators.required ],
      CommissonSplit1volCi: ["",Validators.required ],
     

      AgentNumber2volCi: ["",Validators.required ],
      AgentSubCount2volCi: ["",Validators.required ],
      CommissonSplit2volCi: ["",Validators.required ],

      AgentNumber3volCi: ["",Validators.required ],
      AgentSubCount3volCi: ["",Validators.required ],
      CommissonSplit3volCi: ["",Validators.required ],



      AgentNumberVolGrpLife: ["",Validators.required ],
      AgentSubCountVolGrpLife: ["",Validators.required ],
      CommissonSplitVolGrpLife: ["",Validators.required ],
      AgentNameVolGrpLife:["", Validators.required],

      AgentNumber1VolGrpLife: ["",Validators.required ],
      AgentSubCount1VolGrpLife: ["",Validators.required ],
      CommissonSplit1VolGrpLife: ["",Validators.required ],
     

      AgentNumber2VolGrpLife: ["",Validators.required ],
      AgentSubCount2VolGrpLife: ["",Validators.required ],
      CommissonSplit2VolGrpLife: ["",Validators.required ],

      AgentNumber3VolGrpLife: ["",Validators.required ],
      AgentSubCount3VolGrpLife: ["",Validators.required ],
      CommissonSplit3VolGrpLife: ["",Validators.required ],



      AgentNumberBasicgrpLife: ["",Validators.required ],
      AgentSubCountBasicgrpLife: ["",Validators.required ],
      CommissonSplitBasicgrpLife: ["",Validators.required ],
      AgentNameBasicgrpLife:["", Validators.required],

      AgentNumber1BasicgrpLife: ["",Validators.required ],
      AgentSubCount1BasicgrpLife: ["",Validators.required ],
      CommissonSplit1BasicgrpLife: ["",Validators.required ],
     

      AgentNumber2BasicgrpLife: ["",Validators.required ],
      AgentSubCount2BasicgrpLife: ["",Validators.required ],
      CommissonSplit2BasicgrpLife: ["",Validators.required ],

      AgentNumber3BasicgrpLife: ["",Validators.required ],
      AgentSubCount3BasicgrpLife: ["",Validators.required ],
      CommissonSplit3BasicgrpLife: ["",Validators.required ],

    })
    
   
  }

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
    this.dateChange = (new Date(dateValue.srcElement.value)).toISOString();
    console.log("dateValue", this.dateChange);
  }

  toggleChange(event: any) {

    if (event.checked && this.isChecked) {
      this.checkedToggle = "Active";
      this.isChecked = event.checked;
     
    }
    else {
      this.checkedToggle = "Inactive";
      this.isChecked = event.checked;
      
    }

  }

  toggleChangeProductFppg(event: any) {

    if (event.checked) {
      this.checkedToggleProduct = "Active";
      this.isCheckedFppg = event.checked;
    }
    else {
      this.checkedToggleProduct = "Inactive";
      this.isCheckedFppg = event.checked;
    }

  }

  toggleChangeProductFppIndivisual(event: any) {

    if (event.checked) {
      this.checkedToggleProduct = "Active";
      this.isCheckedFppInd = event.checked;
    }
    else {
      this.checkedToggleProduct = "Inactive";
      this.isCheckedFppInd = event.checked;
    }

  }

  toggleChangeProductAccident(event: any) { 

    if (event.checked) {
      this.checkedToggleProduct = "Active";
      this.isCheckedAccident = event.checked;
    }
    else {
      this.checkedToggleProduct = "Inactive";
      this.isCheckedAccident = event.checked;
    }

  }


  toggleChangeProductHospitalIndemnity(event: any) {

    if (event.checked) {
      this.checkedToggleProduct = "Active";
      this.isCheckedHospital = event.checked;
    }
    else {
      this.checkedToggleProduct = "Inactive";
      this.isCheckedHospital = event.checked;
    }

  }


  toggleChangeProductEmpPaidCi(event: any) {

    if (event.checked) {
      this.checkedToggleProduct = "Active";
      this.isCheckedEmpPaidCi = event.checked;
    }
    else {
      this.checkedToggleProduct = "Inactive";
      this.isCheckedEmpPaidCi = event.checked;
    }

  }


  toggleChangeProductVolCI(event: any) {

    if (event.checked) {
      this.checkedToggleProduct = "Active";
      this.isCheckedVolutaryCi = event.checked;
    }
    else {
      this.checkedToggleProduct = "Inactive";
      this.isCheckedVolutaryCi = event.checked;
    }

  }



  toggleChangeProductVilGrpLife(event: any) {

    if (event.checked) {
      this.checkedToggleProduct = "Active";
      this.isCheckedVolGrpLife = event.checked;
    }
    else {
      this.checkedToggleProduct = "Inactive";
      this.isCheckedVolGrpLife = event.checked;
    }

  }


  toggleChangeProductBasicGrpLife(event: any) {

    if (event.checked) {
      this.checkedToggleProduct = "Active";
      this.isCheckedBasicGrpLife = event.checked;
    }
    else {
      this.checkedToggleProduct = "Inactive";
      this.isCheckedBasicGrpLife = event.checked;
    }

  }


  occClassChange(value: any) {
    this.occupationArray = value;
    // this.occClass = value;
    console.log("this.occupationArray", this.occupationArray);
  }

  onSubmit() {

    let body = {
      "grpId": 0,
      grpNbr: this.groupNumber.toString(),
      grpNm: this.groupName,
      grpEfftvDt: this.dateChange,
       grpPymn: parseInt(this.grpPymn),
     // grpPymn: "10001",
      actvFlg: "false",
      // "actvFlg": this.isChecked,
      occClass: parseInt(this.occupationArray),
      grpSitusSt: this.grpSitusState,
      enrlmntPrtnrsNm: this.EnrolmentPatnerName,
      emlAddrss: this.EnrolEmailAddress,
      emailAddress: this.ManagerEmail,
      acctMgrNm: this.ManegerName,
      "acctMgrCntctId": 0,
      isFPPGActive: this.isCheckedFppg,
      "fppg": {
        "grp_nmbr": "string",
        effctv_dt: (new Date(this.fppgComponent.fppgformgrp.value.FCfppgEffectiveDate)).toISOString(),
        grp_situs_state: this.fppgComponent.fppgformgrp.value.FCfppgSitusState,
        emp_gi_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgEmpGIAmtMax,
        sp_gi_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgSpouseGIAmtMax,
        emp_qi_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgEmpQIAmtMax,
        sp_qi_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgSpouseQIAmtMax,
        emp_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgEmpGIAmtMax,
        sp_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgSpouseMaxAmt,
        effctv_dt_action: this.fppgComponent.fppgformgrp.value.FCfppgEffectiveDate_Action,
        grp_situs_state_action: this.fppgComponent.fppgformgrp.value.FCfppgSitusState_Action,
        emp_gi_max_amt_action: this.fppgComponent.fppgformgrp.value.FCfppgEmpAmtMax_Action,
        sp_gi_max_amt_action: this.fppgComponent.fppgformgrp.value.FCfppgSpouseAmtMax_Action,
        emp_qi_max_amt_action: "string",
        sp_qi_max_amt_action: "string",
        emp_max_amt_action: "string",
        sp_max_amt_action: "string",
        agnt_cd_1:this.agentformgrp.get('AgentNumber').value,
        agnt_nm: this.agentformgrp.get('AgentName').value,
        agnt_comm_split_1: parseInt(this.agentformgrp.get('CommissonSplit').value),
        agntsub_1: this.agentformgrp.get('AgentSubCount').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1').value,
        agnt_comm_split_2: parseInt(this.agentformgrp.get('CommissonSplit1').value),
        agntsub_2: this.agentformgrp.get('AgentSubCount1').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2').value,
        agnt_comm_split_3: parseInt(this.agentformgrp.get('CommissonSplit2').value),
        agntsub_3: this.agentformgrp.get('AgentSubCount2').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3').value,
        agnt_comm_split_4: parseInt(this.agentformgrp.get('CommissonSplit3').value),
        agntsub_4: this.agentformgrp.get('AgentSubCount3').value,
      },
      "isACC_HIActive": this.isCheckedAccident,
      "acC_HI": {
        "effctv_dt": "2020-06-21T12:03:45.088Z",
        "grp_situs_state": "string",
        "rate_lvl": "string",
        "effctv_dt_action": "string",
        "grp_situs_state_action": "string",
        "rate_lvl_action": "string",
        agnt_cd_1:this.agentformgrp.get('AgentNumberaccident').value,
        agnt_nm: this.agentformgrp.get('AgentNameaccident').value,
        agnt_comm_split_1: parseInt(this.agentformgrp.get('CommissonSplitaccident').value),
        agntsub_1: this.agentformgrp.get('AgentSubCountaccident').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1accident').value,
        agnt_comm_split_2: parseInt(this.agentformgrp.get('CommissonSplit1accident').value),
        agntsub_2: this.agentformgrp.get('AgentSubCount1accident').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2accident').value,
        agnt_comm_split_3: parseInt(this.agentformgrp.get('CommissonSplit2accident').value),
        agntsub_3: this.agentformgrp.get('AgentSubCount2accident').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3accident').value,
        agnt_comm_split_4: parseInt(this.agentformgrp.get('CommissonSplit3accident').value),
        agntsub_4: this.agentformgrp.get('AgentSubCount3accident').value,
      },
      "isER_CIActive": this.isCheckedEmpPaidCi ,
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
        agnt_cd_1:this.agentformgrp.get('AgentNumberempPaidci').value,
        agnt_nm: this.agentformgrp.get('AgentNameempPaidci').value,
        agnt_comm_split_1: parseInt(this.agentformgrp.get('CommissonSplitempPaidci').value),
        agntsub_1: this.agentformgrp.get('AgentSubCountempPaidci').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1empPaidci').value,
        agnt_comm_split_2: parseInt(this.agentformgrp.get('CommissonSplit1empPaidci').value),
        agntsub_2: this.agentformgrp.get('AgentSubCount1empPaidci').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2empPaidci').value,
        agnt_comm_split_3: parseInt(this.agentformgrp.get('CommissonSplit2empPaidci').value),
        agntsub_3: this.agentformgrp.get('AgentSubCount2empPaidci').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3empPaidci').value,
        agnt_comm_split_4: parseInt(this.agentformgrp.get('CommissonSplit3empPaidci').value),
        agntsub_4: this.agentformgrp.get('AgentSubCount3empPaidci').value,
      },
      "isVOL_CIActive": this.isCheckedVolutaryCi ,
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
        agnt_cd_1:this.agentformgrp.get('AgentNumbervolCi').value,
        agnt_nm: this.agentformgrp.get('AgentNamevolCi').value,
        agnt_comm_split_1: parseInt(this.agentformgrp.get('CommissonSplitvolCi').value),
        agntsub_1: this.agentformgrp.get('AgentSubCountvolCi').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1volCi').value,
        agnt_comm_split_2: parseInt(this.agentformgrp.get('CommissonSplit1volCi').value),
        agntsub_2: this.agentformgrp.get('AgentSubCount1volCi').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2volCi').value,
        agnt_comm_split_3: parseInt(this.agentformgrp.get('CommissonSplit2volCi').value),
        agntsub_3: this.agentformgrp.get('AgentSubCount2volCi').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3volCi').value,
        agnt_comm_split_4: parseInt(this.agentformgrp.get('CommissonSplit3volCi').value),
        agntsub_4: this.agentformgrp.get('AgentSubCount3volCi').value,
      },
      "isVGLActive": this.isCheckedVolGrpLife ,
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
        agnt_cd_1:this.agentformgrp.get('AgentNumberVolGrpLife').value,
        agnt_nm: this.agentformgrp.get('AgentNameVolGrpLife').value,
        agnt_comm_split_1: parseInt(this.agentformgrp.get('CommissonSplitVolGrpLife').value),
        agntsub_1: this.agentformgrp.get('AgentSubCountVolGrpLife').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1VolGrpLife').value,
        agnt_comm_split_2: parseInt(this.agentformgrp.get('CommissonSplit1VolGrpLife').value),
        agntsub_2: this.agentformgrp.get('AgentSubCount1VolGrpLife').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2VolGrpLife').value,
        agnt_comm_split_3: parseInt(this.agentformgrp.get('CommissonSplit2VolGrpLife').value),
        agntsub_3: this.agentformgrp.get('AgentSubCount2VolGrpLife').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3VolGrpLife').value,
        agnt_comm_split_4: parseInt(this.agentformgrp.get('CommissonSplit3VolGrpLife').value),
        agntsub_4: this.agentformgrp.get('AgentSubCount3VolGrpLife').value,
      },
      "isBGLActive": this.isCheckedBasicGrpLife ,
      "bgl": {
        "grp_nmbr": "string",
        "effctv_dt": "2020-06-21T12:03:45.089Z",
        "grp_situs_state": "string",
        "emp_face_amt_mon_bnft": "string",
        "effctv_dt_action": "string",
        "grp_situs_state_action": "string",
        "emp_face_amt_mon_bnft_action": "string",
        agnt_cd_1:this.agentformgrp.get('AgentNumberBasicgrpLife').value,
        agnt_nm: this.agentformgrp.get('AgentNameBasicgrpLife').value,
        agnt_comm_split_1: parseInt(this.agentformgrp.get('CommissonSplitBasicgrpLife').value),
        agntsub_1: this.agentformgrp.get('AgentSubCountBasicgrpLife').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1BasicgrpLife').value,
        agnt_comm_split_2: parseInt(this.agentformgrp.get('CommissonSplit1BasicgrpLife').value),
        agntsub_2: this.agentformgrp.get('AgentSubCount1BasicgrpLife').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2BasicgrpLife').value,
        agnt_comm_split_3: parseInt(this.agentformgrp.get('CommissonSplit2BasicgrpLife').value),
        agntsub_3: this.agentformgrp.get('AgentSubCount2BasicgrpLife').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3BasicgrpLife').value,
        agnt_comm_split_4: parseInt(this.agentformgrp.get('CommissonSplit3BasicgrpLife').value),
        agntsub_4: this.agentformgrp.get('AgentSubCount3BasicgrpLife').value,
      },
      "isFPPIActive": this.isCheckedFppInd,
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
        agnt_cd_1:this.agentformgrp.get('AgentNumberFppIndivisual').value,
        agnt_nm: this.agentformgrp.get('AgentNameFppIndivisual').value,
        agnt_comm_split_1: parseInt(this.agentformgrp.get('CommissonSplitFppIndivisual').value),
        agntsub_1: this.agentformgrp.get('AgentSubCountFppIndivisual').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1FppIndivisual').value,
        agnt_comm_split_2: parseInt(this.agentformgrp.get('CommissonSplit1FppIndivisual').value),
        agntsub_2: this.agentformgrp.get('AgentSubCount1FppIndivisual').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2FppIndivisual').value,
        agnt_comm_split_3: parseInt(this.agentformgrp.get('CommissonSplit2FppIndivisual').value),
        agntsub_3: this.agentformgrp.get('AgentSubCount2FppIndivisual').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3FppIndivisual').value,
        agnt_comm_split_4: parseInt(this.agentformgrp.get('CommissonSplit3FppIndivisual').value),
        agntsub_4: this.agentformgrp.get('AgentSubCount3FppIndivisual').value,
      }
    }
    
    this.sum = parseFloat(this.agentCommissionSPlit_0)+ 
    parseFloat(this.agentCommissionSPlit_1)+
    parseFloat(this.agentCommissionSPlit_2)+
    parseFloat(this.agentCommissionSPlit_3)

    this.eppcreategroupservice.PosteppCreate(body).subscribe((data: any) => {
      console.log("data", data);
    });

    // if((this.sum) < 100 && this.sum == 0){
    //       this.answer = this.sum;
    //       console.log("this.answer",this.answer);
         
    // }
    // else{
    //     this.snackBar.open("CommonSplit Value is Greater Than 100%", "close", {
    //       duration: 5000,
    //     });
    // }
    
  }
  answer;

}

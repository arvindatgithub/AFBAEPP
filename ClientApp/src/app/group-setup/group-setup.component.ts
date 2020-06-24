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

@Component({
  selector: 'app-group-setup',
  templateUrl: './group-setup.component.html',
  styleUrls: ['./group-setup.component.css']
})
export class GroupSetupComponent implements OnInit {

  @ViewChild('agent', { static: false }) agentComponent: AgentSetupComponent;
  // @ViewChild('radio',{static:false}) radiobutton:RadioButtonComponent;
  @ViewChild('child', { static: false }) fppgComponent: FPPGComponent;
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
       grpPymn: parseInt(this.grpPymn.slice(0,2)),
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
      "isBGLActive": this.isCheckedBasicGrpLife ,
      "bgl": {
        "grp_nmbr": "string",
        "effctv_dt": "2020-06-21T12:03:45.089Z",
        "grp_situs_state": "string",
        "emp_face_amt_mon_bnft": "string",
        "effctv_dt_action": "string",
        "grp_situs_state_action": "string",
        "emp_face_amt_mon_bnft_action": "string",
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

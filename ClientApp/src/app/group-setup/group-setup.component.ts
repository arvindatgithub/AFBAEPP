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
import { AccidentComponent } from '../accident/accident.component';
import { HospitalIndemnityComponent } from '../hospital-indemnity/hospital-indemnity.component';
import { EmployerPaidCIComponent } from '../employer-paid-ci/employer-paid-ci.component';
import { VoluntaryCIComponent } from '../voluntary-ci/voluntary-ci.component';
import { VolGroupLifeComponent } from '../vol-group-life/vol-group-life.component';
import { BasicGroupLifeComponent } from '../basic-group-life/basic-group-life.component'
import { GroupsearchService } from '../services/groupsearch.service';

@Component({
  selector: 'app-group-setup',
  templateUrl: './group-setup.component.html',
  styleUrls: ['./group-setup.component.css']
})
export class GroupSetupComponent implements OnInit {

  // @ViewChild('agent', { static: false }) agentComponent: AgentSetupComponent;
  @ViewChild('child0', { static: false }) fppgComponent: FPPGComponent;
  @ViewChild('child1', { static: false }) fppComponent: FPPIndividualComponent;
  @ViewChild('child2', { static: false }) accidentComponent: AccidentComponent;
  @ViewChild('child3', { static: false }) hospitalIndemnityComponent: HospitalIndemnityComponent;
  @ViewChild('child4', { static: false }) empPaidCiComponent: EmployerPaidCIComponent;
  @ViewChild('child5', { static: false }) VolCiComponent: VoluntaryCIComponent;
  @ViewChild('child6', { static: false }) VolgrpLifeComponent: VolGroupLifeComponent;
  @ViewChild('child7', { static: false }) basicgrplifeComponent: BasicGroupLifeComponent;

  public product: any;
  public addedProducts = [];
  public selectedProducts: any = [];
  titleName: string = "";
  selectedOption = [];
  accident: string = "";
  isChecked = true;
  isCheckedFppg = false;
  isCheckedFppInd = false;
  isCheckedAccident = false;
  isCheckedHospital = false;
  isCheckedEmpPaidCi = false;
  isCheckedVolutaryCi = false;
  isCheckedVolGrpLife = false;
  isCheckedBasicGrpLife = false;
  checkedToggle: string = "Active";
  // checkedToggleProduct: string = "Inactive";
  checkedToggleProductFppg: string = "Inactive";
  checkedToggleProductFppi: string = "Inactive";
  checkedToggleProductACCident: string = "Inactive";
  checkedToggleProductHospitalIndemnity: string = "Inactive";
  checkedToggleProductEmpPaidCI: string = "Inactive";
  checkedToggleProductVolCI: string = "Inactive";
  checkedToggleProductVolGrpCI: string = "Inactive";
  checkedToggleProductBcsGrpLife: string = "Inactive";
  toggleActiveColor: ThemePalette = "primary";
  groupNumber: string = "";
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  public minDate = (new Date()).toISOString().slice(0,10);
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
  paymentModes: any;
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
  occupationArray: any ;
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
  agentNumber_0: any = "";
  agentNumber_1: any = "";
  agentNumber_2: any = "";
  agentNumber_3: any = "";
  agentSubCount_0: any = "";
  agentSubCount_1: any = "";
  agentSubCount_2: any = "";
  agentSubCount_3: any = "";
  agentCommissionSPlit_0: string;
  agentCommissionSPlit_1: string;
  agentCommissionSPlit_2: string;
  agentCommissionSPlit_3: string;
  agent_name: any = "";
  radioButtonArr = [
    { value: '10002', name: 'Always Override' },
    { value: '10001', name: 'Update if Blank' },
    { value: '10003', name: 'Validate' }
  ]

  groupSetupFG: FormGroup;
  groupSetupOCC: FormGroup;
  groupsData: any;

  constructor(private eppcreategroupservice: EppCreateGrpSetupService, private _fb: FormBuilder,
    private snackBar: MatSnackBar, private lookupService: LookupService, private groupsearchService: GroupsearchService) {
  }

  ngOnInit() {
    let existingSelectedGrpNbr: any;
    this.groupsearchService.castGroupNumber.subscribe(data => {
      existingSelectedGrpNbr = data; 
      console.log("selected grp number from search "+ existingSelectedGrpNbr); 
    });

    this.eppcreategroupservice.getGroupNbrEppData(existingSelectedGrpNbr).subscribe(data => {
      console.log('Groups Data on load from db'+ JSON.stringify(data));
      this.groupsData = data;
      //Setting Initial Values for Group Section
      this.groupNumber = this.groupsData.grpNbr;
      this.groupName = this.groupsData.grpNm;
      // this.minDate = this.groupsData.grpEfftvDt.slice(0, 10);
      this.grpPymn = this.groupsData.grpPymn;
      this.EnrolmentPatnerName = this.groupsData.enrlmntPrtnrsNm;
      this.EnrolEmailAddress = this.groupsData.emlAddrss;
      this.occupationArray = this.groupsData.occClass;
      this.ManegerName = this.groupsData.acctMgrNm;
      this.ManagerEmail = this.groupsData.emailAddress;
      // this.lookUpDataSitusStates[0].state = this.groupsData.grpSitusSt; 

    });

    this.occupationArray = this.occClass[0].occupation;
  

    this.lookupService.getLookupsData()
      .subscribe((data: any) => {
        this.isLoading = true;

        if(this.lookUpDataSitusStates.length==0){
          this.lookUpDataSitusStates = (data.situsState);
          this.grpSitusState = this.lookUpDataSitusStates[0].state;
        }
      });
    
    this.lookupService.getPaymentMode().subscribe((data: any) => {
      this.paymentModes = data;
      if(this.grpPymn ==''){
        this.paymentModes.forEach(element => {
          if (element.grpPymntMdCd == 12) {
            this.grpPymn = element.grpPymn;
          }
        });
      }
    });
    

    this.groupSetupFG = this._fb.group({
      fcEffDate: ["", Validators.required],
      FCOccControl: ["", Validators.required]
    })

    this.groupSetupOCC = this._fb.group({
      
      FCOccControl: ["", Validators.required]
    })

    this.agentformgrp = this._fb.group({
      fppgAgent_Action: [this.radioButtonArr[1].value, Validators.required],
      fppiAgent_Action: [this.radioButtonArr[1].value, Validators.required],
      accAgent_Action: [this.radioButtonArr[1].value, Validators.required],
      hospAgent_Action: [this.radioButtonArr[1].value, Validators.required],
      empCIAgent_Action: [this.radioButtonArr[1].value, Validators.required],
      volCIAgent_Action: [this.radioButtonArr[1].value, Validators.required],
      volGrpLfAgent_Action: [this.radioButtonArr[1].value, Validators.required],
      basicGrpLfAgent_Action: [this.radioButtonArr[1].value, Validators.required],

      AgentNumber: ["", Validators.required],
      AgentSubCount: ["", Validators.required],
      CommissonSplit: ["", Validators.required],
      AgentName: ["", Validators.required],

      AgentNumber1: ["", Validators.required],
      AgentSubCount1: ["", Validators.required],
      CommissonSplit1: ["", Validators.required],


      AgentNumber2: ["", Validators.required],
      AgentSubCount2: ["", Validators.required],
      CommissonSplit2: ["", Validators.required],

      AgentNumber3: ["", Validators.required],
      AgentSubCount3: ["", Validators.required],
      CommissonSplit3: ["", Validators.required],


      AgentNumberFppIndivisual: ["", Validators.required],
      AgentSubCountFppIndivisual: ["", Validators.required],
      CommissonSplitFppIndivisual: ["", Validators.required],
      AgentNameFppIndivisual: ["", Validators.required],

      AgentNumber1FppIndivisual: ["", Validators.required],
      AgentSubCount1FppIndivisual: ["", Validators.required],
      CommissonSplit1FppIndivisual: ["", Validators.required],


      AgentNumber2FppIndivisual: ["", Validators.required],
      AgentSubCount2FppIndivisual: ["", Validators.required],
      CommissonSplit2FppIndivisual: ["", Validators.required],

      AgentNumber3FppIndivisual: ["", Validators.required],
      AgentSubCount3FppIndivisual: ["", Validators.required],
      CommissonSplit3FppIndivisual: ["", Validators.required],


      AgentNumberaccident: ["", Validators.required],
      AgentSubCountaccident: ["", Validators.required],
      CommissonSplitaccident: ["", Validators.required],
      AgentNameaccident: ["", Validators.required],

      AgentNumber1accident: ["", Validators.required],
      AgentSubCount1accident: ["", Validators.required],
      CommissonSplit1accident: ["", Validators.required],


      AgentNumber2accident: ["", Validators.required],
      AgentSubCount2accident: ["", Validators.required],
      CommissonSplit2accident: ["", Validators.required],

      AgentNumber3accident: ["", Validators.required],
      AgentSubCount3accident: ["", Validators.required],
      CommissonSplit3accident: ["", Validators.required],



      AgentNumberHospitalIndemnity: ["", Validators.required],
      AgentSubCountHospitalIndemnity: ["", Validators.required],
      CommissonSplitHospitalIndemnity: ["", Validators.required],
      AgentNameHospitalIndemnity: ["", Validators.required],

      AgentNumber1HospitalIndemnity: ["", Validators.required],
      AgentSubCount1HospitalIndemnity: ["", Validators.required],
      CommissonSplit1HospitalIndemnity: ["", Validators.required],


      AgentNumber2HospitalIndemnity: ["", Validators.required],
      AgentSubCount2HospitalIndemnity: ["", Validators.required],
      CommissonSplit2HospitalIndemnity: ["", Validators.required],

      AgentNumber3HospitalIndemnity: ["", Validators.required],
      AgentSubCount3HospitalIndemnity: ["", Validators.required],
      CommissonSplit3HospitalIndemnity: ["", Validators.required],



      AgentNumberempPaidci: ["", Validators.required],
      AgentSubCountempPaidci: ["", Validators.required],
      CommissonSplitempPaidci: ["", Validators.required],
      AgentNameempPaidci: ["", Validators.required],

      AgentNumber1empPaidci: ["", Validators.required],
      AgentSubCount1empPaidci: ["", Validators.required],
      CommissonSplit1empPaidci: ["", Validators.required],


      AgentNumber2empPaidci: ["", Validators.required],
      AgentSubCount2empPaidci: ["", Validators.required],
      CommissonSplit2empPaidci: ["", Validators.required],

      AgentNumber3empPaidci: ["", Validators.required],
      AgentSubCount3empPaidci: ["", Validators.required],
      CommissonSplit3empPaidci: ["", Validators.required],




      AgentNumbervolCi: ["", Validators.required],
      AgentSubCountvolCi: ["", Validators.required],
      CommissonSplitvolCi: ["", Validators.required],
      AgentNamevolCi: ["", Validators.required],

      AgentNumber1volCi: ["", Validators.required],
      AgentSubCount1volCi: ["", Validators.required],
      CommissonSplit1volCi: ["", Validators.required],


      AgentNumber2volCi: ["", Validators.required],
      AgentSubCount2volCi: ["", Validators.required],
      CommissonSplit2volCi: ["", Validators.required],

      AgentNumber3volCi: ["", Validators.required],
      AgentSubCount3volCi: ["", Validators.required],
      CommissonSplit3volCi: ["", Validators.required],



      AgentNumberVolGrpLife: ["", Validators.required],
      AgentSubCountVolGrpLife: ["", Validators.required],
      CommissonSplitVolGrpLife: ["", Validators.required],
      AgentNameVolGrpLife: ["", Validators.required],

      AgentNumber1VolGrpLife: ["", Validators.required],
      AgentSubCount1VolGrpLife: ["", Validators.required],
      CommissonSplit1VolGrpLife: ["", Validators.required],


      AgentNumber2VolGrpLife: ["", Validators.required],
      AgentSubCount2VolGrpLife: ["", Validators.required],
      CommissonSplit2VolGrpLife: ["", Validators.required],

      AgentNumber3VolGrpLife: ["", Validators.required],
      AgentSubCount3VolGrpLife: ["", Validators.required],
      CommissonSplit3VolGrpLife: ["", Validators.required],



      AgentNumberBasicgrpLife: ["", Validators.required],
      AgentSubCountBasicgrpLife: ["", Validators.required],
      CommissonSplitBasicgrpLife: ["", Validators.required],
      AgentNameBasicgrpLife: ["", Validators.required],

      AgentNumber1BasicgrpLife: ["", Validators.required],
      AgentSubCount1BasicgrpLife: ["", Validators.required],
      CommissonSplit1BasicgrpLife: ["", Validators.required],


      AgentNumber2BasicgrpLife: ["", Validators.required],
      AgentSubCount2BasicgrpLife: ["", Validators.required],
      CommissonSplit2BasicgrpLife: ["", Validators.required],

      AgentNumber3BasicgrpLife: ["", Validators.required],
      AgentSubCount3BasicgrpLife: ["", Validators.required],
      CommissonSplit3BasicgrpLife: ["", Validators.required],

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
    console.log('payment mode ' + JSON.stringify(value));
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
      event.stopPropagation();

    }
    else {
      this.checkedToggle = "Inactive";
      this.isChecked = event.checked;
      event.stopPropagation();
    }

  }

  toggleChangeProductFppg(event: any) {
    console.log("event",event);
    if (event.checked) {
      this.checkedToggleProductFppg = "Active";
      this.isCheckedFppg = event.checked;
    }
    else {
      this.checkedToggleProductFppg = "Inactive";
      this.isCheckedFppg = event.checked;
    }

  }

  toggleChangeProductFppIndivisual(event: any) {

    if (event.checked) {
      this.checkedToggleProductFppi = "Active";
      this.isCheckedFppInd = event.checked;
    }
    else {
      this.checkedToggleProductFppi = "Inactive";
      this.isCheckedFppInd = event.checked;
    }

  }

  toggleChangeProductAccident(event: any) {

    if (event.checked) {
      this.checkedToggleProductACCident = "Active";
      this.isCheckedAccident = event.checked;
    }
    else {
      this.checkedToggleProductACCident = "Inactive";
      this.isCheckedAccident = event.checked;
    }

  }


  toggleChangeProductHospitalIndemnity(event: any) {

    if (event.checked) {
      this.checkedToggleProductHospitalIndemnity = "Active";
      this.isCheckedHospital = event.checked;
    }
    else {
      this.checkedToggleProductHospitalIndemnity = "Inactive";
      this.isCheckedHospital = event.checked;
    }

  }


  toggleChangeProductEmpPaidCi(event: any) {

    if (event.checked) {
      this.checkedToggleProductEmpPaidCI = "Active";
      this.isCheckedEmpPaidCi = event.checked;
    }
    else {
      this.checkedToggleProductEmpPaidCI = "Inactive";
      this.isCheckedEmpPaidCi = event.checked;
    }

  }


  toggleChangeProductVolCI(event: any) {

    if (event.checked) {
      this.checkedToggleProductVolCI = "Active";
      this.isCheckedVolutaryCi = event.checked;
    }
    else {
      this.checkedToggleProductVolCI = "Inactive";
      this.isCheckedVolutaryCi = event.checked;
    }

  }



  toggleChangeProductVilGrpLife(event: any) {

    if (event.checked) {
      this.checkedToggleProductVolGrpCI = "Active";
      this.isCheckedVolGrpLife = event.checked;
    }
    else {
      this.checkedToggleProductVolGrpCI = "Inactive";
      this.isCheckedVolGrpLife = event.checked;
    }

  }


  toggleChangeProductBasicGrpLife(event: any) {

    if (event.checked) {
      this.checkedToggleProductBcsGrpLife = "Active";
      this.isCheckedBasicGrpLife = event.checked;
    }
    else {
      this.checkedToggleProductBcsGrpLife = "Inactive";
      this.isCheckedBasicGrpLife = event.checked;
    }

  }


  occClassChange(value: any) {
    this.occupationArray = value;
    // this.occClass = value;
    console.log("this.occupationArray", this.occupationArray);
  }
  emp_quality_of_life: any;
  sp_quality_of_life: any;
  sp_waiver_of_prem: any;
  emp_waiver_of_prem: any;
  emp_quality_of_lifefpp:any;
  emp_waiver_of_premfpp:any;
  sp_quality_of_lifefpp:any;
  sp_waiver_of_premfpp:any;

  onSubmit() {
    console.log("this.fppgComponent.fppgformgrp.value.FCfppgQolRiders",this.fppgComponent.fppgformgrp.value.FCfppgQolRiders)
    if (this.fppgComponent.fppgformgrp.value.FCfppgQolRiders) {
      this.emp_quality_of_life = "070";
      this.sp_quality_of_life = "070";
    }

    else {
      this.emp_quality_of_life = "";
      this.sp_quality_of_life = "";
    }
    if (this.fppgComponent.fppgformgrp.value.FCfppgWaiver) {
      this.emp_waiver_of_prem = "020";
      this.sp_waiver_of_prem = "020";
    }
    else {
      this.emp_waiver_of_prem = "";
      this.sp_waiver_of_prem = "";
    }

    // if (this.fppComponent.fppiformgrp.value.FCfppQolRiders) {
    //   this.emp_quality_of_lifefpp = "070";
    //   this.sp_quality_of_lifefpp = "070";
    // }

    // else {
    //   this.emp_quality_of_lifefpp = "";
    //   this.sp_quality_of_lifefpp = "";
    // }
    // if (this.fppgComponent.fppgformgrp.value.FCfppWaiver) {
    //   this.emp_waiver_of_premfpp = "020";
    //   this.sp_waiver_of_premfpp = "020";
    // }
    // else {
    //   this.emp_waiver_of_premfpp = "";
    //   this.sp_waiver_of_premfpp = "";
    // }


    let body = {

      "grpId": 0,
      "grpNbr": this.groupNumber,
      "grpNm": this.groupName,
      "grpEfftvDt": (new Date(this.groupSetupFG.get('fcEffDate').value)).toISOString(),
      "grpSitusSt": this.grpSitusState,
      // "actvFlg": "false",
      "actvFlg": this.isChecked.toString(),
      "occClass": parseInt(this.groupSetupOCC.get('FCOccControl').value),
      "grpPymn": parseInt(this.grpPymn),
      "enrlmntPrtnrsId": 0,
      "enrlmntPrtnrsNm": this.EnrolmentPatnerName,
      "emlAddrss": this.EnrolEmailAddress,
      "emailAddress": this.ManagerEmail,
      "acctMgrNm": this.ManegerName,
      "acctMgrCntctId": 0,
      "isFPPGActive": this.isCheckedFppg,
      "isHIActive": this.isCheckedHospital,
      "hi": {
        "effctv_dt": (new Date(this.hospitalIndemnityComponent.hospformgrp.value.FChospEffectiveDate)).toISOString(),
        "grp_situs_state": this.hospitalIndemnityComponent.hospformgrp.value.FChospSitusState,
        "effctv_dt_action": this.hospitalIndemnityComponent.hospformgrp.value.FChospEffectiveDate_Action,
        "grp_situs_state_action": this.hospitalIndemnityComponent.hospformgrp.value.FChospSitusState_Action,
        
        agnt_cd_1: this.agentformgrp.get('AgentNumberHospitalIndemnity').value,
        agnt_nm: this.agentformgrp.get('AgentNameHospitalIndemnity').value,
        agnt_comm_split_1: this.agentformgrp.get('CommissonSplitHospitalIndemnity').value,
        agntsub_1: this.agentformgrp.get('AgentSubCountHospitalIndemnity').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1HospitalIndemnity').value,
        agnt_comm_split_2: this.agentformgrp.get('CommissonSplit1HospitalIndemnity').value,
        agntsub_2: this.agentformgrp.get('AgentSubCount1HospitalIndemnity').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2HospitalIndemnity').value,
        agnt_comm_split_3: this.agentformgrp.get('CommissonSplit2HospitalIndemnity').value,
        agntsub_3: this.agentformgrp.get('AgentSubCount2HospitalIndemnity').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3HospitalIndemnity').value,
        agnt_comm_split_4: this.agentformgrp.get('CommissonSplit3HospitalIndemnity').value,
        agntsub_4: this.agentformgrp.get('AgentSubCount3HospitalIndemnity').value,

        agnt_cd_1_action: this.agentformgrp.get('hospAgent_Action').value.toString(),
        agnt_nm_action: this.agentformgrp.get('hospAgent_Action').value.toString(),
        agnt_comm_split_1_action: this.agentformgrp.get('hospAgent_Action').value.toString(),
        agntsub_1_action: this.agentformgrp.get('hospAgent_Action').value.toString(),
        agnt_cd_2_action: this.agentformgrp.get('hospAgent_Action').value.toString(),
        agnt_comm_split_2_action: this.agentformgrp.get('hospAgent_Action').value.toString(),
        agntsub_2_action: this.agentformgrp.get('hospAgent_Action').value.toString(),
        agnt_cd_3_action: this.agentformgrp.get('hospAgent_Action').value.toString(),
        agnt_comm_split_3_action: this.agentformgrp.get('hospAgent_Action').value.toString(),
        agntsub_3_action: this.agentformgrp.get('hospAgent_Action').value.toString(),
        agnt_cd_4_action: this.agentformgrp.get('hospAgent_Action').value.toString(),
        agnt_comm_split_4_action: this.agentformgrp.get('hospAgent_Action').value.toString(),
        agntsub_4_action: this.agentformgrp.get('hospAgent_Action').value.toString(),
      },
      "fppg": {
        "grp_nmbr": "",
        "effctv_dt": (new Date(this.fppgComponent.fppgformgrp.value.FCfppgEffectiveDate)).toISOString(),
        grp_situs_state: this.fppgComponent.fppgformgrp.value.FCfppgSitusState,
        emp_gi_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgEmpGIAmtMax,
        sp_gi_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgSpouseGIAmtMax,
        // "myProperty": "",
        "emp_ProductCode": this.fppgComponent.fppgformgrp.value.FCfppgEmpPlanCode,
        "sp_ProductCode": this.fppgComponent.fppgformgrp.value.FCfppgSpousePlanCode,
        "ch_ProductCode": this.fppgComponent.fppgformgrp.value.FCfppgChildPlanCode,
        "emp_waiver_of_prem": this.emp_waiver_of_prem,
        "sp_waiver_of_prem": this.sp_waiver_of_prem,
        "emp_quality_of_life": this.emp_quality_of_life,
        "sp_quality_of_life": this.sp_quality_of_life,
        "emp_waiver_of_prem_action": this.fppgComponent.fppgformgrp.value.FCfppgQolRiders_Action,
        "sp_waiver_of_prem_action": this.fppgComponent.fppgformgrp.value.FCfppgQolRiders_Action,
        "emp_quality_of_life_action": this.fppgComponent.fppgformgrp.value.FCfppgWaiver_Action,
        "sp_quality_of_life_action": this.fppgComponent.fppgformgrp.value.FCfppgWaiver_Action,
        "emp_plan_cd_action": this.fppgComponent.fppgformgrp.value.FCfppgPlanCodeManualEntry_Action,
        "sp_plan_cd_action": this.fppgComponent.fppgformgrp.value.FCfppgPlanCodeManualEntry_Action,
        "ch_plan_cd_action": this.fppgComponent.fppgformgrp.value.FCfppgPlanCodeManualEntry_Action,
        emp_qi_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgEmpQIAmtMax,
        sp_qi_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgSpouseQIAmtMax,
        emp_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgEmpGIAmtMax,
        sp_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgSpouseMaxAmt,
        effctv_dt_action: this.fppgComponent.fppgformgrp.value.FCfppgEffectiveDate_Action,
        grp_situs_state_action: this.fppgComponent.fppgformgrp.value.FCfppgSitusState_Action,
        emp_gi_max_amt_action: this.fppgComponent.fppgformgrp.value.FCfppgEmpAmtMax_Action,
        sp_gi_max_amt_action: this.fppgComponent.fppgformgrp.value.FCfppgSpouseAmtMax_Action,
        emp_qi_max_amt_action: this.fppgComponent.fppgformgrp.value.FCfppgEmpAmtMax_Action,
        sp_qi_max_amt_action: this.fppgComponent.fppgformgrp.value.FCfppgSpouseAmtMax_Action,
        emp_max_amt_action: this.fppgComponent.fppgformgrp.value.FCfppgEmpAmtMax_Action,
        sp_max_amt_action: this.fppgComponent.fppgformgrp.value.FCfppgSpouseAmtMax_Action,
        agnt_cd_1: this.agentformgrp.get('AgentNumber').value,
        agnt_nm: this.agentformgrp.get('AgentName').value,
        agnt_comm_split_1: this.agentformgrp.get('CommissonSplit').value,
        agntsub_1: this.agentformgrp.get('AgentSubCount').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1').value,
        agnt_comm_split_2: this.agentformgrp.get('CommissonSplit1').value,
        agntsub_2: this.agentformgrp.get('AgentSubCount1').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2').value,
        agnt_comm_split_3: this.agentformgrp.get('CommissonSplit2').value,
        agntsub_3: this.agentformgrp.get('AgentSubCount2').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3').value,
        agnt_comm_split_4: this.agentformgrp.get('CommissonSplit3').value,
        agntsub_4: this.agentformgrp.get('AgentSubCount3').value,

        agnt_cd_1_action: this.agentformgrp.get('fppgAgent_Action').value.toString(),
        agnt_nm_action: this.agentformgrp.get('fppgAgent_Action').value.toString(),
        agnt_comm_split_1_action: this.agentformgrp.get('fppgAgent_Action').value.toString(),
        agntsub_1_action: this.agentformgrp.get('fppgAgent_Action').value.toString(),
        agnt_cd_2_action: this.agentformgrp.get('fppgAgent_Action').value.toString(),
        agnt_comm_split_2_action: this.agentformgrp.get('fppgAgent_Action').value.toString(),
        agntsub_2_action: this.agentformgrp.get('fppgAgent_Action').value.toString(),
        agnt_cd_3_action: this.agentformgrp.get('fppgAgent_Action').value.toString(),
        agnt_comm_split_3_action: this.agentformgrp.get('fppgAgent_Action').value.toString(),
        agntsub_3_action: this.agentformgrp.get('fppgAgent_Action').value.toString(),
        agnt_cd_4_action: this.agentformgrp.get('fppgAgent_Action').value.toString(),
        agnt_comm_split_4_action: this.agentformgrp.get('fppgAgent_Action').value.toString(),
        agntsub_4_action: this.agentformgrp.get('fppgAgent_Action').value.toString(),
      },

      "isACC_HIActive": this.isCheckedAccident,
      "acC_HI": {
        "effctv_dt": (new Date(this.accidentComponent.accformgrp.value.FCaccEffectiveDate)).toISOString(),
        "grp_situs_state": this.accidentComponent.accformgrp.value.FCaccSitusState,
        "rate_lvl": this.accidentComponent.accformgrp.value.FCaccRateLevel,
        "effctv_dt_action": this.accidentComponent.accformgrp.value.FCaccEffectiveDate_Action,
        "grp_situs_state_action": this.accidentComponent.accformgrp.value.FCaccSitusState_Action,
        "rate_lvl_action": this.accidentComponent.accformgrp.value.FCaccRateLevel_Action,
        "owner_smkr_no_smkr_action": this.accidentComponent.accformgrp.value.FCaccOnOff_Action,
        "sp_smkr_no_smkr_action": this.accidentComponent.accformgrp.value.FCaccOnOff_Action,
        "owner_smkr_no_smkr": this.accidentComponent.accformgrp.value.FCaccOnOff,
        "sp_smkr_no_smkr": this.accidentComponent.accformgrp.value.FCaccOnOff,
        agnt_cd_1: this.agentformgrp.get('AgentNumberaccident').value,
        agnt_nm: this.agentformgrp.get('AgentNameaccident').value,
        agnt_comm_split_1: this.agentformgrp.get('CommissonSplitaccident').value,
        agntsub_1: this.agentformgrp.get('AgentSubCountaccident').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1accident').value,
        agnt_comm_split_2: this.agentformgrp.get('CommissonSplit1accident').value,
        agntsub_2: this.agentformgrp.get('AgentSubCount1accident').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2accident').value,
        agnt_comm_split_3: this.agentformgrp.get('CommissonSplit2accident').value,
        agntsub_3: this.agentformgrp.get('AgentSubCount2accident').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3accident').value,
        agnt_comm_split_4: this.agentformgrp.get('CommissonSplit3accident').value,
        agntsub_4: this.agentformgrp.get('AgentSubCount3accident').value,
        agnt_cd_1_action: this.agentformgrp.get('accAgent_Action').value.toString(),
        agnt_nm_action: this.agentformgrp.get('accAgent_Action').value.toString(),
        agnt_comm_split_1_action: this.agentformgrp.get('accAgent_Action').value.toString(),
        agntsub_1_action: this.agentformgrp.get('accAgent_Action').value.toString(),
        agnt_cd_2_action: this.agentformgrp.get('accAgent_Action').value.toString(),
        agnt_comm_split_2_action: this.agentformgrp.get('accAgent_Action').value.toString(),
        agntsub_2_action: this.agentformgrp.get('accAgent_Action').value.toString(),
        agnt_cd_3_action: this.agentformgrp.get('accAgent_Action').value.toString(),
        agnt_comm_split_3_action: this.agentformgrp.get('accAgent_Action').value.toString(),
        agntsub_3_action: this.agentformgrp.get('accAgent_Action').value.toString(),
        agnt_cd_4_action: this.agentformgrp.get('accAgent_Action').value.toString(),
        agnt_comm_split_4_action: this.agentformgrp.get('accAgent_Action').value.toString(),
        agntsub_4_action: this.agentformgrp.get('accAgent_Action').value.toString(),
      },
      "isER_CIActive": this.isCheckedEmpPaidCi,
      "eR_CI": {
        "grp_nmbr": "",
        "effctv_dt": (new Date(this.empPaidCiComponent.empCIformgrp.value.FCempCIEffectiveDate)).toISOString(),
        "grp_situs_state": this.empPaidCiComponent.empCIformgrp.value.FCempCISitusState,
        "emp_face_amt_mon_bnft": this.empPaidCiComponent.empCIformgrp.value.FCempCIEmpFcAmt,
        "sp_face_amt_mon_bnft": this.empPaidCiComponent.empCIformgrp.value.FCempCISpouseFcAmt,
        "effctv_dt_action": this.empPaidCiComponent.empCIformgrp.value.FCempCIEffectiveDate_Action,
        "grp_situs_state_action": this.empPaidCiComponent.empCIformgrp.value.FCempCISitusState_Action,
        "emp_face_amt_mon_bnft_action": this.empPaidCiComponent.empCIformgrp.value.FCempCIEmpFcAmt_Action,
        "sp_face_amt_mon_bnft_action": this.empPaidCiComponent.empCIformgrp.value.FCempCISpouseFcAmt_Action,
        "emp_ProductCode": this.empPaidCiComponent.empCIformgrp.value.FCempCIEMPPlanCode,
        "sp_ProductCode": this.empPaidCiComponent.empCIformgrp.value.FCempCISpouseFcAmt,
        "ch_ProductCode": this.empPaidCiComponent.empCIformgrp.value.FCempCIChdFcAmt,
        "emp_plan_cd_action": this.empPaidCiComponent.empCIformgrp.value.FCempCIPlanCode_Action,
        "sp_plan_cd_action": this.empPaidCiComponent.empCIformgrp.value.FCempCIPlanCode_Action,
        "ch_plan_cd_action": this.empPaidCiComponent.empCIformgrp.value.FCempCIPlanCode_Action,
        "emp_ad_bnft": "",
        "emp_ad_bnft_action": "",
        "sp_ad_bnft":"",
        agnt_cd_1: this.agentformgrp.get('AgentNumberempPaidci').value,
        agnt_nm: this.agentformgrp.get('AgentNameempPaidci').value,
        agnt_comm_split_1: this.agentformgrp.get('CommissonSplitempPaidci').value,
        agntsub_1: this.agentformgrp.get('AgentSubCountempPaidci').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1empPaidci').value,
        agnt_comm_split_2: this.agentformgrp.get('CommissonSplit1empPaidci').value,
        agntsub_2: this.agentformgrp.get('AgentSubCount1empPaidci').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2empPaidci').value,
        agnt_comm_split_3: this.agentformgrp.get('CommissonSplit2empPaidci').value,
        agntsub_3: this.agentformgrp.get('AgentSubCount2empPaidci').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3empPaidci').value,
        agnt_comm_split_4: this.agentformgrp.get('CommissonSplit3empPaidci').value,
        agntsub_4: this.agentformgrp.get('AgentSubCount3empPaidci').value,

        agnt_cd_1_action: this.agentformgrp.get('empCIAgent_Action').value.toString(),
        agnt_nm_action: this.agentformgrp.get('empCIAgent_Action').value.toString(),
        agnt_comm_split_1_action: this.agentformgrp.get('empCIAgent_Action').value.toString(),
        agntsub_1_action: this.agentformgrp.get('empCIAgent_Action').value.toString(),
        agnt_cd_2_action: this.agentformgrp.get('empCIAgent_Action').value.toString(),
        agnt_comm_split_2_action: this.agentformgrp.get('empCIAgent_Action').value.toString(),
        agntsub_2_action: this.agentformgrp.get('empCIAgent_Action').value.toString(),
        agnt_cd_3_action: this.agentformgrp.get('empCIAgent_Action').value.toString(),
        agnt_comm_split_3_action: this.agentformgrp.get('empCIAgent_Action').value.toString(),
        agntsub_3_action: this.agentformgrp.get('empCIAgent_Action').value.toString(),
        agnt_cd_4_action: this.agentformgrp.get('empCIAgent_Action').value.toString(),
        agnt_comm_split_4_action: this.agentformgrp.get('empCIAgent_Action').value.toString(),
        agntsub_4_action: this.agentformgrp.get('empCIAgent_Action').value.toString(),
      },
      "isVOL_CIActive": this.isCheckedVolutaryCi,
      "voL_CI": {
        "grp_nmbr": "",
        "effctv_dt": (new Date(this.VolCiComponent.volCIformgrp.value.FCVolCIEffectiveDate)).toISOString(),
        "grp_situs_state": this.VolCiComponent.volCIformgrp.value.FCVolCISitusState,
        "emp_gi_max_amt": this.VolCiComponent.volCIformgrp.value.FCVolCIEmpGIAmtMax,
        "sp_gi_max_amt": this.VolCiComponent.volCIformgrp.value.FCVolCISpouseGIAmtMax,
        "emp_qi_max_amt": this.VolCiComponent.volCIformgrp.value.FCVolCIEmpGIAmtMax,
        "sp_qi_max_amt": this.VolCiComponent.volCIformgrp.value.FCVolCISpouseQIAmtMax,
        "emp_max_amt": this.VolCiComponent.volCIformgrp.value.FCVolCIEmpAmtMax,
        "sp_max_amt": this.VolCiComponent.volCIformgrp.value.FCVolCISpouseAmtMax,
        "emp_ProductCode": this.VolCiComponent.volCIformgrp.value.FCVolCIEmpPlanCode,
        "sp_ProductCode": this.VolCiComponent.volCIformgrp.value.FCVolCISpousePlanCode,
        "ch_ProductCode": this.VolCiComponent.volCIformgrp.value.FCVolCIChildPlanCode,
        // "owner_smkr_no_smkr": this.VolCiComponent.volCIformgrp.value.,
        // "sp_smkr_no_smkr": this.VolCiComponent.volCIformgrp.value.,
        // "owner_smkr_no_smkr_action": this.VolCiComponent.volCIformgrp.value.,
        // "sp_smkr_no_smkr_action": this.VolCiComponent.volCIformgrp.value.,
      
        "emp_plan_cd_action": this.VolCiComponent.volCIformgrp.value.FCVolCIPlanCodeManualEntry_Action,
        "sp_plan_cd_action": this.VolCiComponent.volCIformgrp.value.FCVolCIPlanCodeManualEntry_Action,
        "ch_plan_cd_action": this.VolCiComponent.volCIformgrp.value.FCVolCIPlanCodeManualEntry_Action,
        "effctv_dt_action": this.VolCiComponent.volCIformgrp.value.FCVolCIEffectiveDate_Action,
        "grp_situs_state_action": this.VolCiComponent.volCIformgrp.value.FCVolCISitusState_Action,
        "emp_gi_max_amt_action": this.VolCiComponent.volCIformgrp.value.FCVolCIEmpGIAmtMax_Action,
        "sp_gi_max_amt_action": this.VolCiComponent.volCIformgrp.value.FCVolCISpouseAmtMax_Action,
        "emp_qi_max_amt_action": this.VolCiComponent.volCIformgrp.value.FCVolCIEmpGIAmtMax_Action,
        "sp_qi_max_amt_action": this.VolCiComponent.volCIformgrp.value.FCVolCISpouseAmtMax_Action,
        "emp_max_amt_action": this.VolCiComponent.volCIformgrp.value.FCVolCIEmpGIAmtMax_Action,
        "sp_max_amt_action": this.VolCiComponent.volCIformgrp.value.FCVolCISpouseAmtMax_Action,
        agnt_cd_1: this.agentformgrp.get('AgentNumbervolCi').value,
        agnt_nm: this.agentformgrp.get('AgentNamevolCi').value,
        agnt_comm_split_1: this.agentformgrp.get('CommissonSplitvolCi').value,
        agntsub_1: this.agentformgrp.get('AgentSubCountvolCi').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1volCi').value,
        agnt_comm_split_2: this.agentformgrp.get('CommissonSplit1volCi').value,
        agntsub_2: this.agentformgrp.get('AgentSubCount1volCi').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2volCi').value,
        agnt_comm_split_3: this.agentformgrp.get('CommissonSplit2volCi').value,
        agntsub_3: this.agentformgrp.get('AgentSubCount2volCi').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3volCi').value,
        agnt_comm_split_4: this.agentformgrp.get('CommissonSplit3volCi').value,
        agntsub_4: this.agentformgrp.get('AgentSubCount3volCi').value,

        agnt_cd_1_action: this.agentformgrp.get('volCIAgent_Action').value.toString(),
        agnt_nm_action: this.agentformgrp.get('volCIAgent_Action').value.toString(),
        agnt_comm_split_1_action: this.agentformgrp.get('volCIAgent_Action').value.toString(),
        agntsub_1_action: this.agentformgrp.get('volCIAgent_Action').value.toString(),
        agnt_cd_2_action: this.agentformgrp.get('volCIAgent_Action').value.toString(),
        agnt_comm_split_2_action: this.agentformgrp.get('volCIAgent_Action').value.toString(),
        agntsub_2_action: this.agentformgrp.get('volCIAgent_Action').value.toString(),
        agnt_cd_3_action: this.agentformgrp.get('volCIAgent_Action').value.toString(),
        agnt_comm_split_3_action: this.agentformgrp.get('volCIAgent_Action').value.toString(),
        agntsub_3_action: this.agentformgrp.get('volCIAgent_Action').value.toString(),
        agnt_cd_4_action: this.agentformgrp.get('volCIAgent_Action').value.toString(),
        agnt_comm_split_4_action: this.agentformgrp.get('volCIAgent_Action').value.toString(),
        agntsub_4_action: this.agentformgrp.get('volCIAgent_Action').value.toString(),
      },
      "isVGLActive": this.isCheckedVolGrpLife,
      "vgl": {
        "grp_nmbr": "",
        "effctv_dt": (new Date(this.VolgrpLifeComponent.volGrpLfformgrp.value.FCVolGrpLfEffectiveDate)).toISOString(),
        "grp_situs_state": this.VolgrpLifeComponent.volGrpLfformgrp.value.FCVolGrpLfSitusState,
        "emp_gi_max_amt": this.VolgrpLifeComponent.volGrpLfformgrp.value.FCVolGrpLfEmpGIAmtMax,
        "sp_gi_max_amt": this.VolgrpLifeComponent.volGrpLfformgrp.value.FCVolGrpLfSpouseGIAmtMax,
        "emp_qi_max_amt": this.VolgrpLifeComponent.volGrpLfformgrp.value.FCVolGrpLfEmpAmtMax,
        "sp_qi_max_amt": this.VolgrpLifeComponent.volGrpLfformgrp.value.FCVolGrpLfSpouseMaxAmt,
        "emp_max_amt": this.VolgrpLifeComponent.volGrpLfformgrp.value.FCVolGrpLfEmpAmtMax,
        "sp_max_amt": this.VolgrpLifeComponent.volGrpLfformgrp.value.FCVolGrpLfSpouseMaxAmt,
        "effctv_dt_action": this.VolgrpLifeComponent.volGrpLfformgrp.value.FCVolGrpLfEffectiveDate_Action,
        "grp_situs_state_action": this.VolgrpLifeComponent.volGrpLfformgrp.value.FCVolGrpLfSitusState_Action,
        "emp_gi_max_amt_action": this.VolgrpLifeComponent.volGrpLfformgrp.value.FCVolGrpLfEmpAmtMax_Action,
        "sp_gi_max_amt_action": this.VolgrpLifeComponent.volGrpLfformgrp.value.FCVolGrpLfSpouseAmtMax_Action,
        "emp_qi_max_amt_action": this.VolgrpLifeComponent.volGrpLfformgrp.value.FCVolGrpLfEmpAmtMax_Action,
        "sp_qi_max_amt_action": this.VolgrpLifeComponent.volGrpLfformgrp.value.FCVolGrpLfSpouseAmtMax_Action,
        "emp_max_amt_action": this.VolgrpLifeComponent.volGrpLfformgrp.value.FCVolGrpLfEmpAmtMax_Action,
        "sp_max_amt_action": this.VolgrpLifeComponent.volGrpLfformgrp.value.FCVolGrpLfSpouseAmtMax_Action,

        agnt_cd_1: this.agentformgrp.get('AgentNumberVolGrpLife').value,
        agnt_nm: this.agentformgrp.get('AgentNameVolGrpLife').value,
        agnt_comm_split_1: this.agentformgrp.get('CommissonSplitVolGrpLife').value,
        agntsub_1: this.agentformgrp.get('AgentSubCountVolGrpLife').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1VolGrpLife').value,
        agnt_comm_split_2: this.agentformgrp.get('CommissonSplit1VolGrpLife').value,
        agntsub_2: this.agentformgrp.get('AgentSubCount1VolGrpLife').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2VolGrpLife').value,
        agnt_comm_split_3: this.agentformgrp.get('CommissonSplit2VolGrpLife').value,
        agntsub_3: this.agentformgrp.get('AgentSubCount2VolGrpLife').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3VolGrpLife').value,
        agnt_comm_split_4: this.agentformgrp.get('CommissonSplit3VolGrpLife').value,
        agntsub_4: this.agentformgrp.get('AgentSubCount3VolGrpLife').value,

        agnt_cd_1_action: this.agentformgrp.get('volGrpLfAgent_Action').value.toString(),
        agnt_nm_action: this.agentformgrp.get('volGrpLfAgent_Action').value.toString(),
        agnt_comm_split_1_action: this.agentformgrp.get('volGrpLfAgent_Action').value.toString(),
        agntsub_1_action: this.agentformgrp.get('volGrpLfAgent_Action').value.toString(),
        agnt_cd_2_action: this.agentformgrp.get('volGrpLfAgent_Action').value.toString(),
        agnt_comm_split_2_action: this.agentformgrp.get('volGrpLfAgent_Action').value.toString(),
        agntsub_2_action: this.agentformgrp.get('volGrpLfAgent_Action').value.toString(),
        agnt_cd_3_action: this.agentformgrp.get('volGrpLfAgent_Action').value.toString(),
        agnt_comm_split_3_action: this.agentformgrp.get('volGrpLfAgent_Action').value.toString(),
        agntsub_3_action: this.agentformgrp.get('volGrpLfAgent_Action').value.toString(),
        agnt_cd_4_action: this.agentformgrp.get('volGrpLfAgent_Action').value.toString(),
        agnt_comm_split_4_action: this.agentformgrp.get('volGrpLfAgent_Action').value.toString(),
        agntsub_4_action: this.agentformgrp.get('volGrpLfAgent_Action').value.toString(),
      },
      "isBGLActive": this.isCheckedBasicGrpLife,
      "bgl": {
        "grp_nmbr": "",
        "effctv_dt": (new Date(this.basicgrplifeComponent.basicGrpLfformgrp.value.FCbasicEffectiveDate)).toISOString(),
        "grp_situs_state": this.basicgrplifeComponent.basicGrpLfformgrp.value.FCbasicSitusState,
        "emp_face_amt_mon_bnft": this.basicgrplifeComponent.basicGrpLfformgrp.value.FCbasicEmpFcAmt,
        "ch_face_amt_mon_bnft_01": this.basicgrplifeComponent.basicGrpLfformgrp.value.ChildFaceAmount,
        "sp_face_amt_mon_bnft": this.basicgrplifeComponent.basicGrpLfformgrp.value.SpouseFaceAmount,
        "effctv_dt_action": this.basicgrplifeComponent.basicGrpLfformgrp.value.FCbasicEffectiveDate_Action,
        "grp_situs_state_action": this.basicgrplifeComponent.basicGrpLfformgrp.value.FCbasicSitusState_Action,
        "emp_face_amt_mon_bnft_action": this.basicgrplifeComponent.basicGrpLfformgrp.value.FCbasicEmpFcAmt_Action,
        "sp_face_amt_mon_bnft_action": this.basicgrplifeComponent.basicGrpLfformgrp.value.FCbasicEmpFcAmt_Action,
        "ch_face_amt_mon_bnft_01_action": this.basicgrplifeComponent.basicGrpLfformgrp.value.FCbasicEmpFcAmt_Action,

        agnt_cd_1: this.agentformgrp.get('AgentNumberBasicgrpLife').value,
        agnt_nm: this.agentformgrp.get('AgentNameBasicgrpLife').value,
        agnt_comm_split_1: this.agentformgrp.get('CommissonSplitBasicgrpLife').value,
        agntsub_1: this.agentformgrp.get('AgentSubCountBasicgrpLife').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1BasicgrpLife').value,
        agnt_comm_split_2: this.agentformgrp.get('CommissonSplit1BasicgrpLife').value,
        agntsub_2: this.agentformgrp.get('AgentSubCount1BasicgrpLife').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2BasicgrpLife').value,
        agnt_comm_split_3: this.agentformgrp.get('CommissonSplit2BasicgrpLife').value,
        agntsub_3: this.agentformgrp.get('AgentSubCount2BasicgrpLife').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3BasicgrpLife').value,
        agnt_comm_split_4: this.agentformgrp.get('CommissonSplit3BasicgrpLife').value,
        agntsub_4: this.agentformgrp.get('AgentSubCount3BasicgrpLife').value,

        agnt_cd_1_action: this.agentformgrp.get('basicGrpLfAgent_Action').value.toString(),
        agnt_nm_action: this.agentformgrp.get('basicGrpLfAgent_Action').value.toString(),
        agnt_comm_split_1_action: this.agentformgrp.get('basicGrpLfAgent_Action').value.toString(),
        agntsub_1_action: this.agentformgrp.get('basicGrpLfAgent_Action').value.toString(),
        agnt_cd_2_action: this.agentformgrp.get('basicGrpLfAgent_Action').value.toString(),
        agnt_comm_split_2_action: this.agentformgrp.get('basicGrpLfAgent_Action').value.toString(),
        agntsub_2_action: this.agentformgrp.get('basicGrpLfAgent_Action').value.toString(),
        agnt_cd_3_action: this.agentformgrp.get('basicGrpLfAgent_Action').value.toString(),
        agnt_comm_split_3_action: this.agentformgrp.get('basicGrpLfAgent_Action').value.toString(),
        agntsub_3_action: this.agentformgrp.get('basicGrpLfAgent_Action').value.toString(),
        agnt_cd_4_action: this.agentformgrp.get('basicGrpLfAgent_Action').value.toString(),
        agnt_comm_split_4_action: this.agentformgrp.get('basicGrpLfAgent_Action').value.toString(),
        agntsub_4_action: this.agentformgrp.get('basicGrpLfAgent_Action').value.toString(),

      },

      "isFPPIActive": this.isCheckedFppInd,
      "fppi": {
        "grp_nmbr": "",
        "effctv_dt": (new Date(this.fppComponent.fppiformgrp.value.FCfppiEffectiveDate)).toISOString(),
        "grp_situs_state": "",
        "emp_gi_max_amt": this.fppComponent.fppiformgrp.value.FCfppiEmpGIAmtMax,
        "sp_gi_max_amt": this.fppComponent.fppiformgrp.value.FCfppiSpouseGIAmtMax,
        "emp_qi_max_amt": this.fppComponent.fppiformgrp.value.FCfppiEmpQIAmtMax,
        "sp_qi_max_amt": this.fppComponent.fppiformgrp.value.FCfppiSpouseQIAmtMax,
        "emp_max_amt": this.fppComponent.fppiformgrp.value.FCfppiEmpAmtMax,
        "sp_max_amt": this.fppComponent.fppiformgrp.value.FCfppiSpouseMaxAmt,
        "user_token": this.fppComponent.fppiformgrp.value.FCfppiUserToken,
        "case_token": this.fppComponent.fppiformgrp.value.FCfppiCaseToken,
        "effctv_dt_action": this.fppComponent.fppiformgrp.value.FCfppiEffectiveDate_Action,
        "grp_situs_state_action": "",
        "agnt_sig_txt_1": this.fppComponent.fppiformgrp.value.FCfppiAgentSign,
        "agnt_sig_txt_1_action": this.fppComponent.fppiformgrp.value.FCfppiAgentSign_Action,
        "user_token_action": this.fppComponent.fppiformgrp.value.FCfppiUserToken_Action,
        "case_token_action": this.fppComponent.fppiformgrp.value.FCfppiCaseToken_Action,
        "emp_ProductCode": this.fppComponent.fppiformgrp.value.FCfppiempPlanCode,
        "sp_ProductCode": this.fppComponent.fppiformgrp.value.FCfppiSpousePlanCode,
        "ch_ProductCode": this.fppComponent.fppiformgrp.value.FCfppiChildPlanCode,
        "emp_waiver_of_prem":"020",
        "sp_waiver_of_prem": "020",
        "emp_quality_of_life": "070",
        "sp_quality_of_life": "070",
        "emp_waiver_of_prem_action": this.fppComponent.fppiformgrp.value.FCfppiWaiver_Action,
        "sp_waiver_of_prem_action": this.fppComponent.fppiformgrp.value.FCfppiWaiver_Action,
        "emp_quality_of_life_action": this.fppComponent.fppiformgrp.value.FCfppiQolRiders_Action,
        "sp_quality_of_life_action": this.fppComponent.fppiformgrp.value.FCfppiQolRiders_Action,
        "emp_plan_cd_action": this.fppComponent.fppiformgrp.value.FCfppiPlanCodeManualEntry_Action,
        "sp_plan_cd_action": this.fppComponent.fppiformgrp.value.FCfppiPlanCodeManualEntry_Action,
        "ch_plan_cd_action": this.fppComponent.fppiformgrp.value.FCfppiPlanCodeManualEntry_Action,
        "emp_gi_max_amt_action": this.fppComponent.fppiformgrp.value.FCfppiEmpAmtMax_Action,
        "sp_gi_max_amt_action": this.fppComponent.fppiformgrp.value.FCfppiSpouseAmtMax_Action,
        "emp_qi_max_amt_action": this.fppComponent.fppiformgrp.value.FCfppiEmpAmtMax_Action,
        "sp_qi_max_amt_action": this.fppComponent.fppiformgrp.value.FCfppiSpouseAmtMax_Action,
        "emp_max_amt_action": this.fppComponent.fppiformgrp.value.FCfppiEmpAmtMax_Action,
        "sp_max_amt_action": this.fppComponent.fppiformgrp.value.FCfppiSpouseAmtMax_Action,
        agnt_cd_1: this.agentformgrp.get('AgentNumberFppIndivisual').value,
        agnt_nm: this.agentformgrp.get('AgentNameFppIndivisual').value,
        agnt_comm_split_1: this.agentformgrp.get('CommissonSplitFppIndivisual').value,
        agntsub_1: this.agentformgrp.get('AgentSubCountFppIndivisual').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1FppIndivisual').value,
        agnt_comm_split_2: this.agentformgrp.get('CommissonSplit1FppIndivisual').value,
        agntsub_2: this.agentformgrp.get('AgentSubCount1FppIndivisual').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2FppIndivisual').value,
        agnt_comm_split_3: this.agentformgrp.get('CommissonSplit2FppIndivisual').value,
        agntsub_3: this.agentformgrp.get('AgentSubCount2FppIndivisual').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3FppIndivisual').value,
        agnt_comm_split_4: this.agentformgrp.get('CommissonSplit3FppIndivisual').value,
        agntsub_4: this.agentformgrp.get('AgentSubCount3FppIndivisual').value,
        agnt_cd_1_action: this.agentformgrp.get('fppiAgent_Action').value.toString(),
        agnt_nm_action: this.agentformgrp.get('fppiAgent_Action').value.toString(),
        agnt_comm_split_1_action: this.agentformgrp.get('fppiAgent_Action').value.toString(),
        agntsub_1_action: this.agentformgrp.get('fppiAgent_Action').value.toString(),
        agnt_cd_2_action: this.agentformgrp.get('fppiAgent_Action').value.toString(),
        agnt_comm_split_2_action: this.agentformgrp.get('fppiAgent_Action').value.toString(),
        agntsub_2_action: this.agentformgrp.get('fppiAgent_Action').value.toString(),
        agnt_cd_3_action: this.agentformgrp.get('fppiAgent_Action').value.toString(),
        agnt_comm_split_3_action: this.agentformgrp.get('fppiAgent_Action').value.toString(),
        agntsub_3_action: this.agentformgrp.get('fppiAgent_Action').value.toString(),
        agnt_cd_4_action: this.agentformgrp.get('fppiAgent_Action').value.toString(),
        agnt_comm_split_4_action: this.agentformgrp.get('fppiAgent_Action').value.toString(),
        agntsub_4_action: this.agentformgrp.get('fppiAgent_Action').value.toString(),
      }

    }
    this.eppcreategroupservice.PosteppCreate(body).subscribe((data: any) => {
      console.log("data", data);
    },
    (error:any) =>{
      this.snackBar.open(error.error,"close",{
          duration:2000,
      });
      window.scrollTo(0,0);
    }
    );


  }

}

import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, NgForm } from '@angular/forms';
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
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute,Router } from '@angular/router';

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
  bSubmitDisable : boolean= false;
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
  public minDate;
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
  isDisabled = false;
  occClass: any[] = [
    
    {
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
  agentId_0: string = "";
  agentId_1: string = "";
  agentId_2: string = "";
  agentId_3: string = "";
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
  commissionSplitErr = false;
  commissionSplitErrFppg = false;
  commissionSplitErrFppi = false;
  commissionSplitErrAcc = false;
  commissionSplitErrHos = false;
  commissionSplitErrEmpCI = false;
  commissionSplitErrVolCI = false;
  commissionSplitErrVolGpLf = false;
  commissionSplitErrBGL = false;
  editExistGrpNbr;
  occupationSelected = '';
  selectedState = '0';
  fieldsetDisabled = false;
  addToggle = false;
  editToggle = false;
  cloneToggle = false;
  toggleFlag ;
  status;
  fromSearchFlag;
  sub : any;
  grpNbr;
  editServiceCall = false;

  
  constructor(private eppcreategroupservice: EppCreateGrpSetupService,private toastr: ToastrService, private _fb: FormBuilder,
    private snackBar: MatSnackBar, private lookupService: LookupService, private route: ActivatedRoute,private router: Router,
    private groupsearchService: GroupsearchService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.grpNbr = params['grpNbr']; 
   });
   
   this.eppcreategroupservice.setChaStatus('');

      this.eppcreategroupservice.getGroupNbrEppData(this.grpNbr).subscribe(data => {
        console.log('Groups Data on load from db'+ JSON.stringify(data));
        this.groupsData = data;

        //Setting Initial Values for Group Section
        this.groupNumber = this.groupsData.grpNbr;
        this.groupName = this.groupsData.grpNm;
        this.minDate = this.groupsData.grpEfftvDt.slice(0, 10) == '0001-01-01' ? '': this.groupsData.grpEfftvDt.slice(0, 10);
        this.grpPymn = this.groupsData.grpPymn !== 0 ? this.groupsData.grpPymn : '10007';
        this.EnrolmentPatnerName = this.groupsData.enrlmntPrtnrsNm;
        this.EnrolEmailAddress = this.groupsData.emlAddrss;
        //this.occupationArray.id = this.groupsData.occClass;
        if(this.groupsData.occClass !== null){
          this.occupationSelected = this.groupsData.occClass;
        }else{
          this.occupationSelected = '1';
        }
        this.ManegerName = this.groupsData.acctMgrNm;
        this.ManagerEmail = this.groupsData.acctMgrEmailAddrs;
        //this.selected.id = this.groupsData.grpSitusSt;
        
        if(this.groupsData.grpSitusSt !== null){
          this.selectedState = this.groupsData.grpSitusSt;
        }else{
          this.selectedState = '0';
        }
        this.isCheckedAccident = this.groupsData.isACC_HIActive;
        this.checkedToggleProductACCident = (this.isCheckedAccident) ? "Active" : "Inactive";
        this.isCheckedFppg = this.groupsData.isFPPGActive;
        this.checkedToggleProductFppg = (this.isCheckedFppg) ? "Active" : "Inactive";
        this.isCheckedHospital = this.groupsData.isHIActive;
        this.checkedToggleProductHospitalIndemnity = this.isCheckedHospital ? "Active" : "Inactive";
        this.isCheckedVolGrpLife = this.groupsData.isVGLActive;
        this.checkedToggleProductVolGrpCI = this.isCheckedVolGrpLife ? "Active" : "Inactive";
        this.isCheckedVolutaryCi = this.groupsData.isVOL_CIActive;
        this.checkedToggleProductVolCI = this.isCheckedVolutaryCi ? "Active" : "Inactive";
        this.isCheckedFppInd = this.groupsData.isFPPIActive;
        this.checkedToggleProductFppi = this.isCheckedFppInd ? "Active" : "Inactive";
        this.isCheckedEmpPaidCi = this.groupsData.isER_CIActive;
        this.checkedToggleProductEmpPaidCI = this.isCheckedEmpPaidCi ? "Active" : "Inactive";
        this.isCheckedBasicGrpLife = this.groupsData.isBGLActive;
        this.checkedToggleProductBcsGrpLife = this.isCheckedBasicGrpLife ? "Active" : "Inactive";
        if (this.groupsData.grpAgents !== "" && this.groupsData.grpAgents !== null && this.groupsData.grpAgents.length>0) {
         
          this.agentId_0=this.groupsData.grpAgents[0] ? this.groupsData.grpAgents[0].agentId : '';
          this.agentNumber_0 = this.groupsData.grpAgents[0] ? this.groupsData.grpAgents[0].agntNbr : '';
          this.agentSubCount_0 =  this.groupsData.grpAgents[0] ? this.groupsData.grpAgents[0].agntSubCnt : '';
          this.agentCommissionSPlit_0 =  this.groupsData.grpAgents[0] ? this.groupsData.grpAgents[0].agntComsnSplt : '';
          this.agent_name =  this.groupsData.grpAgents[0] ? this.groupsData.grpAgents[0].agntNm : '';

          this.agentId_1 = this.groupsData.grpAgents[1] ? this.groupsData.grpAgents[1].agentId:'' ;
          this.agentNumber_1 = this.groupsData.grpAgents[1] ? this.groupsData.grpAgents[1].agntNbr : '';
          this.agentSubCount_1 =  this.groupsData.grpAgents[1] ? this.groupsData.grpAgents[1].agntSubCnt : '';
          this.agentCommissionSPlit_1 =  this.groupsData.grpAgents[1] ? this.groupsData.grpAgents[1].agntComsnSplt : '';

          this.agentId_2 = this.groupsData.grpAgents[2] ? this.groupsData.grpAgents[2].agentId:'';
          this.agentNumber_2 = this.groupsData.grpAgents[2] ? this.groupsData.grpAgents[2].agntNbr : '';
          this.agentSubCount_2 =  this.groupsData.grpAgents[2] ? this.groupsData.grpAgents[2].agntSubCnt : '';
          this.agentCommissionSPlit_2 =  this.groupsData.grpAgents[2] ? this.groupsData.grpAgents[2].agntComsnSplt : '';

          this.agentId_3 = this.groupsData.grpAgents[3] ? this.groupsData.grpAgents[3].agentId: '';
          this.agentNumber_3 = this.groupsData.grpAgents[3] ? this.groupsData.grpAgents[3].agntNbr : '';
          this.agentSubCount_3 =  this.groupsData.grpAgents[3] ? this.groupsData.grpAgents[3].agntSubCnt : '';
          this.agentCommissionSPlit_3 =  this.groupsData.grpAgents[3] ? this.groupsData.grpAgents[3].agntComsnSplt : '';
        }
        if(this.groupsData !== undefined){
          this.agentformgrp = this._fb.group({
            fppgAgent_Action: [(this.groupsData.isFPPGActive) ? this.groupsData.fppg.agnt_nm_action : this.radioButtonArr[1].value, Validators.required],
            fppiAgent_Action: [(this.groupsData.isFPPIActive) ? this.groupsData.fppi.agnt_nm_action : this.radioButtonArr[1].value, Validators.required],
            accAgent_Action: [(this.groupsData.isACC_HIActive) ? this.groupsData.acC_HI.agnt_nm_action : this.radioButtonArr[1].value, Validators.required],
            hospAgent_Action: [(this.groupsData.isHIActive) ? this.groupsData.hi.agnt_nm_action : this.radioButtonArr[1].value, Validators.required],
            empCIAgent_Action: [(this.groupsData.isER_CIActive) ? this.groupsData.eR_CI.agnt_nm_action : this.radioButtonArr[1].value, Validators.required],
            volCIAgent_Action: [(this.groupsData.isVOL_CIActive) ? this.groupsData.voL_CI.agnt_nm_action : this.radioButtonArr[1].value, Validators.required],
            volGrpLfAgent_Action: [(this.groupsData.isVGLActive) ? this.groupsData.vgl.agnt_nm_action : this.radioButtonArr[1].value, Validators.required],
            basicGrpLfAgent_Action: [(this.groupsData.isBGLActive) ? this.groupsData.bgl.agnt_nm_action : this.radioButtonArr[1].value, Validators.required],
            //group
            AgentNumber: [this.agentNumber_0, Validators.required],
            AgentSubCount: [this.agentSubCount_0, Validators.required],
            CommissonSplit: [this.agentCommissionSPlit_0, Validators.required],
            AgentName: [this.agent_name, Validators.required],
      
            AgentNumber1: [this.agentNumber_1, Validators.required],
            AgentSubCount1: [this.agentSubCount_1, Validators.required],
            CommissonSplit1: [this.agentCommissionSPlit_1, Validators.required],
      
      
            AgentNumber2: [this.agentNumber_2, Validators.required],
            AgentSubCount2: [this.agentSubCount_2, Validators.required],
            CommissonSplit2: [this.agentCommissionSPlit_2, Validators.required],
      
            AgentNumber3: [this.agentNumber_3, Validators.required],
            AgentSubCount3: [this.agentSubCount_3, Validators.required],
            CommissonSplit3: [this.agentCommissionSPlit_3, Validators.required],
            //Fppg
            AgentNumberfppg: [(this.groupsData.isFPPGActive) ? this.groupsData.fppg.agnt_cd_1 : this.agentNumber_0, Validators.required],
            AgentSubCountfppg: [(this.groupsData.isFPPGActive) ? this.groupsData.fppg.agntsub_1 : this.agentSubCount_0, Validators.required],
            CommissonSplitfppg: [(this.groupsData.isFPPGActive) ? this.groupsData.fppg.agnt_comm_split_1 : this.agentCommissionSPlit_0, Validators.required],
            AgentNamefppg: [(this.groupsData.isFPPGActive) ? this.groupsData.fppg.agnt_nm : this.agent_name, Validators.required],
      
            AgentNumber1fppg: [(this.groupsData.isFPPGActive) ? this.groupsData.fppg.agnt_cd_2 : this.agentNumber_1, Validators.required],
            AgentSubCount1fppg: [(this.groupsData.isFPPGActive) ? this.groupsData.fppg.agntsub_2 : this.agentSubCount_1, Validators.required],
            CommissonSplit1fppg: [(this.groupsData.isFPPGActive) ? this.groupsData.fppg.agnt_comm_split_2 : this.agentCommissionSPlit_1, Validators.required],
      
      
            AgentNumber2fppg: [(this.groupsData.isFPPGActive) ? this.groupsData.fppg.agnt_cd_3 : this.agentNumber_2, Validators.required],
            AgentSubCount2fppg: [(this.groupsData.isFPPGActive) ? this.groupsData.fppg.agntsub_3 : this.agentSubCount_2, Validators.required],
            CommissonSplit2fppg: [(this.groupsData.isFPPGActive) ? this.groupsData.fppg.agnt_comm_split_3 : this.agentCommissionSPlit_2, Validators.required],
      
            AgentNumber3fppg: [(this.groupsData.isFPPGActive) ? this.groupsData.fppg.agnt_cd_4 : this.agentNumber_3, Validators.required],
            AgentSubCount3fppg: [(this.groupsData.isFPPGActive) ? this.groupsData.fppg.agntsub_4 : this.agentSubCount_3, Validators.required],
            CommissonSplit3fppg: [(this.groupsData.isFPPGActive) ? this.groupsData.fppg.agnt_comm_split_4 : this.agentCommissionSPlit_3, Validators.required],
      
            //FPPI
            AgentNumberFppIndivisual: [(this.groupsData.isFPPIActive) ? this.groupsData.fppi.agnt_cd_1 : this.agentNumber_0, Validators.required],
            AgentSubCountFppIndivisual: [(this.groupsData.isFPPIActive) ? this.groupsData.fppi.agntsub_1 : this.agentSubCount_0, Validators.required],
            CommissonSplitFppIndivisual: [(this.groupsData.isFPPIActive) ? this.groupsData.fppi.agnt_comm_split_1 : this.agentCommissionSPlit_0, Validators.required],
            AgentNameFppIndivisual: [(this.groupsData.isFPPIActive) ? this.groupsData.fppi.agnt_nm : this.agent_name, Validators.required],
      
            AgentNumber1FppIndivisual: [(this.groupsData.isFPPIActive) ? this.groupsData.fppi.agnt_cd_2 : this.agentNumber_1, Validators.required],
            AgentSubCount1FppIndivisual: [(this.groupsData.isFPPIActive) ? this.groupsData.fppi.agntsub_2 : this.agentSubCount_1, Validators.required],
            CommissonSplit1FppIndivisual: [(this.groupsData.isFPPIActive) ? this.groupsData.fppi.agnt_comm_split_2 : this.agentCommissionSPlit_1, Validators.required],
      
      
            AgentNumber2FppIndivisual: [(this.groupsData.isFPPIActive) ? this.groupsData.fppi.agnt_cd_3 : this.agentNumber_2, Validators.required],
            AgentSubCount2FppIndivisual: [(this.groupsData.isFPPIActive) ? this.groupsData.fppi.agntsub_3 : this.agentSubCount_2, Validators.required],
            CommissonSplit2FppIndivisual: [(this.groupsData.isFPPIActive) ? this.groupsData.fppi.agnt_comm_split_3 : this.agentCommissionSPlit_2, Validators.required],
      
            AgentNumber3FppIndivisual: [(this.groupsData.isFPPIActive) ? this.groupsData.fppi.agnt_cd_4 : this.agentNumber_3, Validators.required],
            AgentSubCount3FppIndivisual: [(this.groupsData.isFPPIActive) ? this.groupsData.fppi.agntsub_4 : this.agentSubCount_3, Validators.required],
            CommissonSplit3FppIndivisual: [(this.groupsData.isFPPIActive) ? this.groupsData.fppi.agnt_comm_split_4 : this.agentCommissionSPlit_3, Validators.required],
      
            //Accident
            AgentNumberaccident: [(this.groupsData.isACC_HIActive) ? this.groupsData.acC_HI.agnt_cd_1 : this.agentNumber_0, Validators.required],
            AgentSubCountaccident: [(this.groupsData.isACC_HIActive) ? this.groupsData.acC_HI.agntsub_1 : this.agentSubCount_0, Validators.required],
            CommissonSplitaccident: [(this.groupsData.isACC_HIActive) ? this.groupsData.acC_HI.agnt_comm_split_1 : this.agentCommissionSPlit_0, Validators.required],
            AgentNameaccident: [(this.groupsData.isACC_HIActive) ? this.groupsData.acC_HI.agnt_nm : this.agent_name, Validators.required],
      
            AgentNumber1accident: [(this.groupsData.isACC_HIActive) ? this.groupsData.acC_HI.agnt_cd_2 : this.agentNumber_1, Validators.required],
            AgentSubCount1accident: [(this.groupsData.isACC_HIActive) ? this.groupsData.acC_HI.agntsub_2 : this.agentSubCount_1, Validators.required],
            CommissonSplit1accident: [(this.groupsData.isACC_HIActive) ? this.groupsData.acC_HI.agnt_comm_split_2 : this.agentCommissionSPlit_1, Validators.required],
      
      
            AgentNumber2accident: [(this.groupsData.isACC_HIActive) ? this.groupsData.acC_HI.agnt_cd_3 : this.agentNumber_2, Validators.required],
            AgentSubCount2accident: [(this.groupsData.isACC_HIActive) ? this.groupsData.acC_HI.agntsub_3 : this.agentSubCount_2, Validators.required],
            CommissonSplit2accident: [(this.groupsData.isACC_HIActive) ? this.groupsData.acC_HI.agnt_comm_split_3 : this.agentCommissionSPlit_2, Validators.required],
      
            AgentNumber3accident: [(this.groupsData.isACC_HIActive) ? this.groupsData.acC_HI.agnt_cd_4 : this.agentNumber_3, Validators.required],
            AgentSubCount3accident: [(this.groupsData.isACC_HIActive) ? this.groupsData.acC_HI.agntsub_4 : this.agentSubCount_3, Validators.required],
            CommissonSplit3accident: [(this.groupsData.isACC_HIActive) ? this.groupsData.acC_HI.agnt_comm_split_4 : this.agentCommissionSPlit_3, Validators.required],
      
      
            //Hospital
            
            AgentNumberHospitalIndemnity: [(this.groupsData.isHIActive) ? this.groupsData.hi.agnt_cd_1 :this.agentNumber_0, Validators.required],
            AgentSubCountHospitalIndemnity: [(this.groupsData.isHIActive) ? this.groupsData.hi.agntsub_1:  this.agentSubCount_0, Validators.required],
            CommissonSplitHospitalIndemnity: [(this.groupsData.isHIActive) ? this.groupsData.hi.agnt_comm_split_1 : this.agentCommissionSPlit_0, Validators.required],
            AgentNameHospitalIndemnity: [(this.groupsData.isHIActive) ? this.groupsData.hi.agnt_nm :   this.agent_name, Validators.required],
      
            AgentNumber1HospitalIndemnity: [(this.groupsData.isHIActive) ? this.groupsData.hi.agnt_cd_2 :  this.agentNumber_1, Validators.required],
            AgentSubCount1HospitalIndemnity: [(this.groupsData.isHIActive) ? this.groupsData.hi.agntsub_2 : this.agentSubCount_1, Validators.required],
            CommissonSplit1HospitalIndemnity: [(this.groupsData.isHIActive) ? this.groupsData.hi.agnt_comm_split_2 : this.agentCommissionSPlit_1, Validators.required],
      
      
            AgentNumber2HospitalIndemnity: [(this.groupsData.isHIActive) ? this.groupsData.hi.agnt_cd_3 :  this.agentNumber_2, Validators.required],
            AgentSubCount2HospitalIndemnity: [(this.groupsData.isHIActive) ? this.groupsData.hi.agntsub_3 :  this.agentSubCount_2, Validators.required],
            CommissonSplit2HospitalIndemnity: [(this.groupsData.isHIActive) ? this.groupsData.hi.agnt_comm_split_3 : this.agentCommissionSPlit_2, Validators.required],
      
            AgentNumber3HospitalIndemnity: [(this.groupsData.isHIActive) ? this.groupsData.hi.agnt_cd_4 :  this.agentNumber_3, Validators.required],
            AgentSubCount3HospitalIndemnity: [(this.groupsData.isHIActive) ? this.groupsData.hi.agntsub_4 : this.agentSubCount_3, Validators.required],
            CommissonSplit3HospitalIndemnity: [(this.groupsData.isHIActive) ? this.groupsData.hi.agnt_comm_split_4 : this.agentCommissionSPlit_3, Validators.required],
      
            //EMP-CI
      
            AgentNumberempPaidci: [(this.groupsData.isER_CIActive) ? this.groupsData.eR_CI.agnt_cd_1 : this.agentNumber_0, Validators.required],
            AgentSubCountempPaidci: [(this.groupsData.isER_CIActive) ? this.groupsData.eR_CI.agntsub_1 : this.agentSubCount_0, Validators.required],
            CommissonSplitempPaidci: [(this.groupsData.isER_CIActive) ? this.groupsData.eR_CI.agnt_comm_split_1 : this.agentCommissionSPlit_0, Validators.required],
            AgentNameempPaidci: [(this.groupsData.isER_CIActive) ? this.groupsData.eR_CI.agnt_nm :  this.agent_name, Validators.required],
      
            AgentNumber1empPaidci: [(this.groupsData.isER_CIActive) ? this.groupsData.eR_CI.agnt_cd_2 :  this.agentNumber_1, Validators.required],
            AgentSubCount1empPaidci: [(this.groupsData.isER_CIActive) ? this.groupsData.eR_CI.agntsub_2 : this.agentSubCount_1, Validators.required],
            CommissonSplit1empPaidci: [(this.groupsData.isER_CIActive) ? this.groupsData.eR_CI.agnt_comm_split_2 :  this.agentCommissionSPlit_1, Validators.required],
      
      
            AgentNumber2empPaidci: [(this.groupsData.isER_CIActive) ? this.groupsData.eR_CI.agnt_cd_3 : this.agentNumber_2, Validators.required],
            AgentSubCount2empPaidci: [(this.groupsData.isER_CIActive) ? this.groupsData.eR_CI.agntsub_3 :  this.agentSubCount_2, Validators.required],
            CommissonSplit2empPaidci: [(this.groupsData.isER_CIActive) ? this.groupsData.eR_CI.agnt_comm_split_3 :  this.agentCommissionSPlit_2, Validators.required],
      
            AgentNumber3empPaidci: [(this.groupsData.isER_CIActive) ? this.groupsData.eR_CI.agnt_cd_4 :  this.agentNumber_3, Validators.required],
            AgentSubCount3empPaidci: [(this.groupsData.isER_CIActive) ? this.groupsData.eR_CI.agntsub_4 : this.agentSubCount_3, Validators.required],
            CommissonSplit3empPaidci: [(this.groupsData.isER_CIActive) ? this.groupsData.eR_CI.agnt_comm_split_4 :  this.agentCommissionSPlit_3, Validators.required],
      
      
      
            //VOL-CI
            AgentNumbervolCi: [(this.groupsData.isVOL_CIActive) ? this.groupsData.voL_CI.agnt_cd_1 : this.agentNumber_0, Validators.required],
            AgentSubCountvolCi: [(this.groupsData.isVOL_CIActive) ? this.groupsData.voL_CI.agntsub_1 :  this.agentSubCount_0, Validators.required],
            CommissonSplitvolCi: [(this.groupsData.isVOL_CIActive) ? this.groupsData.voL_CI.agnt_comm_split_1 : this.agentCommissionSPlit_0, Validators.required],
            AgentNamevolCi: [(this.groupsData.isVOL_CIActive) ? this.groupsData.voL_CI.agnt_nm : this.agent_name, Validators.required],
      
            AgentNumber1volCi: [(this.groupsData.isVOL_CIActive) ? this.groupsData.voL_CI.agnt_cd_2 :  this.agentNumber_1, Validators.required],
            AgentSubCount1volCi: [(this.groupsData.isVOL_CIActive) ? this.groupsData.voL_CI.agntsub_2 : this.agentSubCount_1, Validators.required],
            CommissonSplit1volCi: [(this.groupsData.isVOL_CIActive) ? this.groupsData.voL_CI.agnt_comm_split_2 : this.agentCommissionSPlit_1, Validators.required],
      
      
            AgentNumber2volCi: [(this.groupsData.isVOL_CIActive) ? this.groupsData.voL_CI.agnt_cd_3 : this.agentNumber_2 , Validators.required],
            AgentSubCount2volCi: [(this.groupsData.isVOL_CIActive) ? this.groupsData.voL_CI.agntsub_3 : this.agentSubCount_2, Validators.required],
            CommissonSplit2volCi: [(this.groupsData.isVOL_CIActive) ? this.groupsData.voL_CI.agnt_comm_split_3 : this.agentCommissionSPlit_2, Validators.required],
      
            AgentNumber3volCi: [(this.groupsData.isVOL_CIActive) ? this.groupsData.voL_CI.agnt_cd_4 :  this.agentNumber_3 , Validators.required],
            AgentSubCount3volCi: [(this.groupsData.isVOL_CIActive) ? this.groupsData.voL_CI.agntsub_4 : this.agentSubCount_3, Validators.required],
            CommissonSplit3volCi: [(this.groupsData.isVOL_CIActive) ? this.groupsData.voL_CI.agnt_comm_split_4 : this.agentCommissionSPlit_3, Validators.required],
      
      
            //VOL-GLF
            AgentNumberVolGrpLife: [(this.groupsData.isVGLActive) ? this.groupsData.vgl.agnt_cd_1 :  this.agentNumber_0, Validators.required],
            AgentSubCountVolGrpLife: [(this.groupsData.isVGLActive) ? this.groupsData.vgl.agntsub_1 :  this.agentSubCount_0, Validators.required],
            CommissonSplitVolGrpLife: [(this.groupsData.isVGLActive) ? this.groupsData.vgl.agnt_comm_split_1 : this.agentCommissionSPlit_0, Validators.required],
            AgentNameVolGrpLife: [(this.groupsData.isVGLActive) ? this.groupsData.vgl.agnt_nm :  this.agent_name, Validators.required],
      
            AgentNumber1VolGrpLife: [(this.groupsData.isVGLActive) ? this.groupsData.vgl.agnt_cd_2 : this.agentNumber_1, Validators.required],
            AgentSubCount1VolGrpLife: [(this.groupsData.isVGLActive) ? this.groupsData.vgl.agntsub_2 : this.agentSubCount_1, Validators.required],
            CommissonSplit1VolGrpLife: [(this.groupsData.isVGLActive) ? this.groupsData.vgl.agnt_comm_split_2 : this.agentCommissionSPlit_1, Validators.required],
      
      
            AgentNumber2VolGrpLife: [(this.groupsData.isVGLActive) ? this.groupsData.vgl.agnt_cd_3 : this.agentNumber_2, Validators.required],
            AgentSubCount2VolGrpLife: [(this.groupsData.isVGLActive) ? this.groupsData.vgl.agntsub_3 : this.agentSubCount_2, Validators.required],
            CommissonSplit2VolGrpLife: [(this.groupsData.isVGLActive) ? this.groupsData.vgl.agnt_comm_split_3 :   this.agentCommissionSPlit_2, Validators.required],
      
            AgentNumber3VolGrpLife: [(this.groupsData.isVGLActive) ? this.groupsData.vgl.agnt_cd_4 : this.agentNumber_3, Validators.required],
            AgentSubCount3VolGrpLife: [(this.groupsData.isVGLActive) ? this.groupsData.vgl.agntsub_4 :   this.agentSubCount_3, Validators.required],
            CommissonSplit3VolGrpLife: [(this.groupsData.isVGLActive) ? this.groupsData.vgl.agnt_comm_split_4 :  this.agentCommissionSPlit_3, Validators.required],
      
            //BGL
      
            AgentNumberBasicgrpLife: [(this.groupsData.isBGLActive) ? this.groupsData.bgl.agnt_cd_1 : this.agentNumber_0, Validators.required],
            AgentSubCountBasicgrpLife: [(this.groupsData.isBGLActive) ? this.groupsData.bgl.agntsub_1 : this.agentSubCount_0, Validators.required],
            CommissonSplitBasicgrpLife: [(this.groupsData.isBGLActive) ? this.groupsData.bgl.agnt_comm_split_1 :  this.agentCommissionSPlit_0, Validators.required],
            AgentNameBasicgrpLife: [(this.groupsData.isBGLActive) ? this.groupsData.bgl.agnt_nm : this.agent_name, Validators.required],
      
            AgentNumber1BasicgrpLife: [(this.groupsData.isBGLActive) ? this.groupsData.bgl.agnt_cd_2 : this.agentNumber_1, Validators.required],
            AgentSubCount1BasicgrpLife: [(this.groupsData.isBGLActive) ? this.groupsData.bgl.agntsub_2 : this.agentSubCount_1, Validators.required],
            CommissonSplit1BasicgrpLife: [(this.groupsData.isBGLActive) ? this.groupsData.bgl.agnt_comm_split_2 :  this.agentCommissionSPlit_1, Validators.required],
      
      
            AgentNumber2BasicgrpLife: [(this.groupsData.isBGLActive) ? this.groupsData.bgl.agnt_cd_3 : this.agentNumber_2, Validators.required],
            AgentSubCount2BasicgrpLife: [(this.groupsData.isBGLActive) ? this.groupsData.bgl.agntsub_3 : this.agentSubCount_2, Validators.required],
            CommissonSplit2BasicgrpLife: [(this.groupsData.isBGLActive) ? this.groupsData.bgl.agnt_comm_split_3 :  this.agentCommissionSPlit_2, Validators.required],
      
            AgentNumber3BasicgrpLife: [(this.groupsData.isBGLActive) ? this.groupsData.bgl.agnt_cd_4 : this.agentNumber_3, Validators.required],
            AgentSubCount3BasicgrpLife: [(this.groupsData.isBGLActive) ? this.groupsData.bgl.agntsub_4 : this.agentSubCount_3, Validators.required],
            CommissonSplit3BasicgrpLife: [(this.groupsData.isBGLActive) ? this.groupsData.bgl.agnt_comm_split_4 :  this.agentCommissionSPlit_3, Validators.required],
      
          });
        }
        this.eppcreategroupservice.castsetStatus.subscribe((data) => {
          this.status = data;
          if (this.groupsearchService.getFromSearchFlag() && this.status == '') {
            this.fieldsetDisabled = true;
            this.agentformgrp.disable();
            this.toggleFlag = true;
            this.bSubmitDisable = true;
          } else {
            this.fieldsetDisabled = false;
            this.agentformgrp.enable();
            this.bSubmitDisable = false;
            this.toggleFlag = false;
          }
        });

        let key = 'GroupNumApiData';
        if (localStorage.getItem("GroupNumApiData") !== null) {
          localStorage.clear();
        }
        localStorage.setItem(key, JSON.stringify(this.groupsData));


        
      });
      console.log(' flag flag '+this.groupsearchService.getFromSearchFlag());
      if(!this.groupsearchService.getFromSearchFlag()){
        this.onAdd();
      }
    
    this.lookupService.getLookupsData().subscribe((data: any) => {
      this.isLoading = true;

      if(this.lookUpDataSitusStates.length==0){
        this.lookUpDataSitusStates = (data.situsState);
        this.grpSitusState = this.lookUpDataSitusStates[0].state;
        let key = 'lookUpSitusApiData';
        if (localStorage.getItem("lookUpSitusApiData") !== null) {
          localStorage.clear();
        }
        localStorage.setItem(key, JSON.stringify(this.lookUpDataSitusStates));

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
      // FCOccControl: ["", Validators.required]
    })

    this.groupSetupOCC = this._fb.group({
      
      FCOccControl: ["", Validators.required]
    })
   // this.status = this.eppcreategroupservice.getUserStatus();
    this.fromSearchFlag = this.groupsearchService.getFromSearchFlag();
    if(localStorage.getItem('AddGroup') !== null){
      localStorage.clear();
      this.addToggle = true;
      this.editToggle = false;
      this.cloneToggle = false;
      this.toggleFlag = false;
      this.fieldsetDisabled = false;
    // this.agentformgrp.enable();
      this.editServiceCall = false;
      this.eppcreategroupservice.setChaStatus('Add');
      //this.eppcreategroupservice.setUserStatus('Add');
      this.status = this.eppcreategroupservice.getUserStatus();
      this.bSubmitDisable = false;
    }


  }

  onEdit() {
    this.addToggle = false;
    this.editToggle = true;
    this.cloneToggle = false;
    this.toggleFlag = false;
    let grpNbr = this.groupsearchService.getEditGrpNbr();
    this.fieldsetDisabled = false;
    //this.agentformgrp.enable();
    this.editServiceCall = true;
    this.eppcreategroupservice.setChaStatus('Edit');
    this.bSubmitDisable = false;
    //this.eppcreategroupservice.setUserStatus('Edit');
    this.status = this.eppcreategroupservice.getUserStatus();
  }
  onAdd() {
    
    let key = 'AddGroup';
    if (localStorage.getItem("AddGroup") !== null) {
      localStorage.clear();
    }
    localStorage.setItem(key, '1');

    this.router.navigate(['/group-setup']);
    


  }
  onClone() {
    this.addToggle = false;
    this.editToggle = false;
    this.cloneToggle = true;
    this.toggleFlag = false;
    this.fieldsetDisabled = false;
    this.eppcreategroupservice.setChaStatus('Clone');

    this.editServiceCall = false;
    this.groupNumber = '';
    this.groupName = '';
    this.bSubmitDisable = false;

  }


/* agent section change events */
 commissionSplitCheck(){
  let a= this.agentCommissionSPlit_0 !== undefined && this.agentCommissionSPlit_0 !== '' ? parseInt(this.agentCommissionSPlit_0) : 0;
  let b= this.agentCommissionSPlit_1 !== undefined && this.agentCommissionSPlit_1 !== '' ? parseInt(this.agentCommissionSPlit_1) : 0;
  let c= this.agentCommissionSPlit_2 !== undefined && this.agentCommissionSPlit_2 !== '' ?  parseInt(this.agentCommissionSPlit_2) : 0;
  let d= this.agentCommissionSPlit_3 !== undefined && this.agentCommissionSPlit_3 !== '' ? parseInt(this.agentCommissionSPlit_3) :0;
  let e = a+b+c+d;
  if(e !== 100){
    this.commissionSplitErr = true;
  } 

  else {
    this.commissionSplitErr = false;
  }
 }
 commisioncheckFppg(){
  let a= this.agentformgrp.get('CommissonSplitfppg').value !== undefined && this.agentformgrp.get('CommissonSplitfppg').value !== '' ? parseInt(this.agentformgrp.get('CommissonSplitfppg').value) : 0;
  let b= this.agentformgrp.get('CommissonSplit1fppg').value !== undefined && this.agentformgrp.get('CommissonSplit1fppg').value!=='' ? parseInt(this.agentformgrp.get('CommissonSplit1fppg').value) : 0; 
  let c= this.agentformgrp.get('CommissonSplit2fppg').value !== undefined && this.agentformgrp.get('CommissonSplit2fppg').value!=='' ? parseInt(this.agentformgrp.get('CommissonSplit2fppg').value) : 0;
  let d= this.agentformgrp.get('CommissonSplit3fppg').value !== undefined && this.agentformgrp.get('CommissonSplit3fppg').value !== ''? parseInt(this.agentformgrp.get('CommissonSplit3fppg').value) : 0;
  let e = a+b+c+d;
  if(e !== 100){
    this.commissionSplitErrFppg = true;
  } else {
    this.commissionSplitErrFppg = false;
    this.commissionSplitErr = false;
  }
 }
 commisioncheckFppi(){
  let a= this.agentformgrp.get('CommissonSplitFppIndivisual').value !== undefined && this.agentformgrp.get('CommissonSplitFppIndivisual').value !== '' ? parseInt(this.agentformgrp.get('CommissonSplitFppIndivisual').value) : 0;
  let b= this.agentformgrp.get('CommissonSplit1FppIndivisual').value !== undefined && this.agentformgrp.get('CommissonSplit1FppIndivisual').value!=='' ? parseInt(this.agentformgrp.get('CommissonSplit1FppIndivisual').value) : 0; 
  let c= this.agentformgrp.get('CommissonSplit2FppIndivisual').value !== undefined && this.agentformgrp.get('CommissonSplit2FppIndivisual').value!=='' ? parseInt(this.agentformgrp.get('CommissonSplit2FppIndivisual').value) : 0;
  let d= this.agentformgrp.get('CommissonSplit3FppIndivisual').value !== undefined && this.agentformgrp.get('CommissonSplit3FppIndivisual').value !== ''? parseInt(this.agentformgrp.get('CommissonSplit3FppIndivisual').value) : 0;
  let e = a+b+c+d;
  if(e !== 100){
    this.commissionSplitErrFppi = true;
  } else {
    this.commissionSplitErrFppi = false;
    this.commissionSplitErr = false;
  }
 }
 commisioncheckAcc(){
  let a= this.agentformgrp.get('CommissonSplitaccident').value !== undefined && this.agentformgrp.get('CommissonSplitaccident').value !== '' ? parseInt(this.agentformgrp.get('CommissonSplitaccident').value) : 0;
  let b= this.agentformgrp.get('CommissonSplit1accident').value !== undefined && this.agentformgrp.get('CommissonSplit1accident').value!=='' ? parseInt(this.agentformgrp.get('CommissonSplit1accident').value) : 0; 
  let c= this.agentformgrp.get('CommissonSplit2accident').value !== undefined && this.agentformgrp.get('CommissonSplit2accident').value!=='' ? parseInt(this.agentformgrp.get('CommissonSplit2accident').value) : 0;
  let d= this.agentformgrp.get('CommissonSplit3accident').value !== undefined && this.agentformgrp.get('CommissonSplit3accident').value !== ''? parseInt(this.agentformgrp.get('CommissonSplit3accident').value) : 0;
  let e = a+b+c+d;
  if(e !== 100){
    this.commissionSplitErrAcc = true;
  } else {
    this.commissionSplitErrAcc = false;
    this.commissionSplitErr = false;
  }
 }
 
 commisioncheckHos(){
  let a= this.agentformgrp.get('CommissonSplitHospitalIndemnity').value !== undefined && this.agentformgrp.get('CommissonSplitHospitalIndemnity').value !== '' ? parseInt(this.agentformgrp.get('CommissonSplitHospitalIndemnity').value) : 0;
  let b= this.agentformgrp.get('CommissonSplit1HospitalIndemnity').value !== undefined && this.agentformgrp.get('CommissonSplit1HospitalIndemnity').value!=='' ? parseInt(this.agentformgrp.get('CommissonSplit1HospitalIndemnity').value) : 0; 
  let c= this.agentformgrp.get('CommissonSplit2HospitalIndemnity').value !== undefined && this.agentformgrp.get('CommissonSplit2HospitalIndemnity').value!=='' ? parseInt(this.agentformgrp.get('CommissonSplit2HospitalIndemnity').value) : 0;
  let d= this.agentformgrp.get('CommissonSplit3HospitalIndemnity').value !== undefined && this.agentformgrp.get('CommissonSplit3HospitalIndemnity').value !== ''? parseInt(this.agentformgrp.get('CommissonSplit3HospitalIndemnity').value) : 0;
  let e = a+b+c+d;
  if(e !== 100){
    this.commissionSplitErrHos = true;
  } else {
    this.commissionSplitErrHos = false;
    this.commissionSplitErr = false;
  }
 }
 commisioncheckEmpCI(){
  let a= this.agentformgrp.get('CommissonSplitempPaidci').value !== undefined && this.agentformgrp.get('CommissonSplitempPaidci').value !== '' ? parseInt(this.agentformgrp.get('CommissonSplitempPaidci').value) : 0;
  let b= this.agentformgrp.get('CommissonSplit1empPaidci').value !== undefined && this.agentformgrp.get('CommissonSplit1empPaidci').value!=='' ? parseInt(this.agentformgrp.get('CommissonSplit1empPaidci').value) : 0; 
  let c= this.agentformgrp.get('CommissonSplit2empPaidci').value !== undefined && this.agentformgrp.get('CommissonSplit2empPaidci').value!=='' ? parseInt(this.agentformgrp.get('CommissonSplit2empPaidci').value) : 0;
  let d= this.agentformgrp.get('CommissonSplit3empPaidci').value !== undefined && this.agentformgrp.get('CommissonSplit3empPaidci').value !== ''? parseInt(this.agentformgrp.get('CommissonSplit3empPaidci').value) : 0;
  let e = a+b+c+d;
  if(e !== 100){
    this.commissionSplitErrEmpCI = true;
  } else {
    this.commissionSplitErrEmpCI = false;
    this.commissionSplitErr = false;
  }
 }
 commisioncheckVolCI(){
  let a= this.agentformgrp.get('CommissonSplitvolCi').value !== undefined && this.agentformgrp.get('CommissonSplitvolCi').value !== '' ? parseInt(this.agentformgrp.get('CommissonSplitvolCi').value) : 0;
  let b= this.agentformgrp.get('CommissonSplit1volCi').value !== undefined && this.agentformgrp.get('CommissonSplit1volCi').value!=='' ? parseInt(this.agentformgrp.get('CommissonSplit1volCi').value) : 0; 
  let c= this.agentformgrp.get('CommissonSplit2volCi').value !== undefined && this.agentformgrp.get('CommissonSplit2volCi').value!=='' ? parseInt(this.agentformgrp.get('CommissonSplit2volCi').value) : 0;
  let d= this.agentformgrp.get('CommissonSplit3volCi').value !== undefined && this.agentformgrp.get('CommissonSplit3volCi').value !== ''? parseInt(this.agentformgrp.get('CommissonSplit3volCi').value) : 0;
  let e = a+b+c+d;
  if(e !== 100){
    this.commissionSplitErrVolCI = true;
  } else {
    this.commissionSplitErrVolCI = false;
    this.commissionSplitErr = false;
  }
 }
 commisioncheckVolGpLf(){
  let a= this.agentformgrp.get('CommissonSplitVolGrpLife').value !== undefined && this.agentformgrp.get('CommissonSplitVolGrpLife').value !== '' ? parseInt(this.agentformgrp.get('CommissonSplitVolGrpLife').value) : 0;
  let b= this.agentformgrp.get('CommissonSplit1VolGrpLife').value !== undefined && this.agentformgrp.get('CommissonSplit1VolGrpLife').value!=='' ? parseInt(this.agentformgrp.get('CommissonSplit1VolGrpLife').value) : 0; 
  let c= this.agentformgrp.get('CommissonSplit2VolGrpLife').value !== undefined && this.agentformgrp.get('CommissonSplit2VolGrpLife').value!=='' ? parseInt(this.agentformgrp.get('CommissonSplit2VolGrpLife').value) : 0;
  let d= this.agentformgrp.get('CommissonSplit3VolGrpLife').value !== undefined && this.agentformgrp.get('CommissonSplit3VolGrpLife').value !== ''? parseInt(this.agentformgrp.get('CommissonSplit3VolGrpLife').value) : 0;
  let e = a+b+c+d;
  if(e !== 100){
    this.commissionSplitErrVolGpLf = true;
  } else {
    this.commissionSplitErrVolGpLf = false;
    this.commissionSplitErr = false;
  }
 }
 commisioncheckBGL(){
  let a= this.agentformgrp.get('CommissonSplitBasicgrpLife').value !== undefined && this.agentformgrp.get('CommissonSplitBasicgrpLife').value !== '' ? parseInt(this.agentformgrp.get('CommissonSplitBasicgrpLife').value) : 0;
  let b= this.agentformgrp.get('CommissonSplit1BasicgrpLife').value !== undefined && this.agentformgrp.get('CommissonSplit1BasicgrpLife').value!=='' ? parseInt(this.agentformgrp.get('CommissonSplit1BasicgrpLife').value) : 0; 
  let c= this.agentformgrp.get('CommissonSplit2BasicgrpLife').value !== undefined && this.agentformgrp.get('CommissonSplit2BasicgrpLife').value!=='' ? parseInt(this.agentformgrp.get('CommissonSplit2BasicgrpLife').value) : 0;
  let d= this.agentformgrp.get('CommissonSplit3BasicgrpLife').value !== undefined && this.agentformgrp.get('CommissonSplit3BasicgrpLife').value !== ''? parseInt(this.agentformgrp.get('CommissonSplit3BasicgrpLife').value) : 0;
  let e = a+b+c+d;
  if(e !== 100){
    this.commissionSplitErrBGL = true;
  } else {
    this.commissionSplitErrBGL = false;
    this.commissionSplitErr = false;
  }
 }


//1st row
  changeAgNum0(val){
    console.log('changed val' + val);
    this.agentformgrp.patchValue({  
      AgentNumberfppg: val,
      AgentNumberFppIndivisual: val,
      AgentNumberaccident: val,
      AgentNumberHospitalIndemnity: val,
      AgentNumberempPaidci: val,
      AgentNumbervolCi: val,
      AgentNumberVolGrpLife: val,
      AgentNumberBasicgrpLife: val,
    });
  }

  changeAgSub0(val){
    console.log('changed val' + val);
    this.agentformgrp.patchValue({
      AgentSubCountfppg: val,
      AgentSubCountFppIndivisual: val,
      AgentSubCountaccident: val,
      AgentSubCountHospitalIndemnity: val,
      AgentSubCountempPaidci: val,
      AgentSubCountvolCi: val,
      AgentSubCountVolGrpLife: val,
      AgentSubCountBasicgrpLife: val,  
    });
  }

  changeAgComSpl0(val){
    console.log('changed val' + val);
    this.agentformgrp.patchValue({  
      CommissonSplitfppg: val,
      CommissonSplitFppIndivisual: val,
      CommissonSplitaccident: val,
      CommissonSplitHospitalIndemnity: val,
      CommissonSplitempPaidci: val,
      CommissonSplitvolCi: val,
      CommissonSplitVolGrpLife: val,
      CommissonSplitBasicgrpLife : val,
    });
    this.commissionSplitCheck();
  }
  changeAgNm0(val){
    console.log('changed val' + val);
    this.agentformgrp.patchValue({  
      AgentNamefppg: val,
      AgentNameFppIndivisual: val,
      AgentNameaccident: val,
      AgentNameHospitalIndemnity: val,
      AgentNameempPaidci: val,
      AgentNamevolCi: val,
      AgentNameVolGrpLife: val,
      AgentNameBasicgrpLife: val,
    });
  }

  //2 row
  changeAgNum1(val){
    console.log('changed val' + val);
    this.agentformgrp.patchValue({  
      AgentNumber1fppg: val,
      AgentNumber1FppIndivisual: val,
      AgentNumber1accident: val,
      AgentNumber1HospitalIndemnity: val,
      AgentNumber1empPaidci: val,
      AgentNumber1volCi: val,
      AgentNumber1VolGrpLife: val,
      AgentNumber1BasicgrpLife: val,
    });
  }
  changeAgSub1(val){
    console.log('changed val' + val);
    this.agentformgrp.patchValue({  
      AgentSubCount1fppg: val,
      AgentSubCount1FppIndivisual: val,
      AgentSubCount1accident: val,
      AgentSubCount1HospitalIndemnity: val,
      AgentSubCount1empPaidci: val,
      AgentSubCount1volCi: val,
      AgentSubCount1VolGrpLife: val,
      AgentSubCount1BasicgrpLife: val,
    });
  }
  changeAgComSpl1(val){
    console.log('changed val' + val);
    this.agentformgrp.patchValue({  
      CommissonSplit1fppg: val,
      CommissonSplit1FppIndivisual: val,
      CommissonSplit1accident: val,
      CommissonSplit1HospitalIndemnity: val,
      CommissonSplit1empPaidci: val,
      CommissonSplit1volCi: val,
      CommissonSplit1VolGrpLife: val,
      CommissonSplit1BasicgrpLife: val,
    });
    this.commissionSplitCheck();
  }

  //3 row
  changeAgNum2(val){
    console.log('changed val' + val);
    this.agentformgrp.patchValue({  
      AgentNumber2fppg: val,
      AgentNumber2FppIndivisual: val,
      AgentNumber2accident: val,
      AgentNumber2HospitalIndemnity: val,
      AgentNumber2empPaidci: val,
      AgentNumber2volCi: val,
      AgentNumber2VolGrpLife: val,
      AgentNumber2BasicgrpLife: val,
    });
  }
  changeAgSub2(val){
    console.log('changed val' + val);
    this.agentformgrp.patchValue({  
      AgentSubCount2fppg: val,
      AgentSubCount2FppIndivisual: val,
      AgentSubCount2accident: val,
      AgentSubCount2HospitalIndemnity: val,
      AgentSubCount2empPaidci: val,
      AgentSubCount2volCi: val,
      AgentSubCount2VolGrpLife: val,
      AgentSubCount2BasicgrpLife: val,
    });
  }
  changeAgComSpl2(val){
    console.log('changed val' + val);
    this.agentformgrp.patchValue({  
      CommissonSplit2fppg: val,
      CommissonSplit2FppIndivisual: val,
      CommissonSplit2accident: val,
      CommissonSplit2HospitalIndemnity: val,
      CommissonSplit2empPaidci: val,
      CommissonSplit2volCi: val,
      CommissonSplit2VolGrpLife: val,
      CommissonSplit2BasicgrpLife: val,
    });
    this.commissionSplitCheck();
  }

  //4 row
  changeAgNum3(val){
    console.log('changed val' + val);
    this.agentformgrp.patchValue({  
      AgentNumber3fppg: val,
      AgentNumber3FppIndivisual: val,
      AgentNumber3accident: val,
      AgentNumber3HospitalIndemnity: val,
      AgentNumber3empPaidci: val,
      AgentNumber3volCi: val,
      AgentNumber3VolGrpLife: val,
      AgentNumber3BasicgrpLife : val,
    });
  }
  changeAgSub3(val){
    console.log('changed val' + val);
    this.agentformgrp.patchValue({  
      AgentSubCount3fppg: val,
      AgentSubCount3FppIndivisual: val,
      AgentSubCount3accident: val,
      AgentSubCount3HospitalIndemnity: val,
      AgentSubCount3empPaidci: val,
      AgentSubCount3volCi: val,
      AgentSubCount3VolGrpLife: val,
      AgentSubCount3BasicgrpLife : val,
    });
  }
  changeAgComSpl3(val){
    console.log('changed val' + val);
    this.agentformgrp.patchValue({  
      CommissonSplit3fppg: val,
      CommissonSplit3FppIndivisual: val,
      CommissonSplit3accident: val,
      CommissonSplit3HospitalIndemnity: val,
      CommissonSplit3empPaidci: val,
      CommissonSplit3volCi: val,
      CommissonSplit3VolGrpLife: val,
      CommissonSplit3BasicgrpLife: val,
    });
    this.commissionSplitCheck();
  }


/* agent section change events */
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
    this.selectedState = value;
    console.log("hello + value");
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
      this.isDisabled = this.isDisabled;
    }
    else {
      this.checkedToggleProductFppg = "Inactive";
      this.isCheckedFppg = event.checked;
      this.isDisabled = !this.isDisabled;
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

  emp_quality_of_life: any;
  sp_quality_of_life: any;
  sp_waiver_of_prem: any;
  emp_waiver_of_prem: any;
  emp_quality_of_lifefpp:any;
  emp_waiver_of_premfpp:any;
  sp_quality_of_lifefpp:any;
  sp_waiver_of_premfpp:any;
  
  onSubmit(form:NgForm) {
    console.log("form",form);
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

    let groupAgents= [];
    let agent1 = {
      agentId: this.agentId_0,
      agntNbr: this.agentNumber_0,
      agntNm: this.agent_name,
      agntSubCnt: this.agentSubCount_0,
      agntComsnSplt: this.agentCommissionSPlit_0,
      grpId: ""
    }
    let agent2 = {
      agentId: this.agentId_1,
      agntNbr: this.agentNumber_1,
      agntNm: "",
      agntSubCnt: this.agentSubCount_1,
      agntComsnSplt: this.agentCommissionSPlit_1,
      grpId: ""
    }
    let agent3 = {
      agentId: this.agentId_2,
      agntNbr: this.agentNumber_2,
      agntNm: "",
      agntSubCnt: this.agentSubCount_2,
      agntComsnSplt: this.agentCommissionSPlit_2,
      grpId: ""
    }
    let agent4 = {
      agentId: this.agentId_3,
      agntNbr: this.agentNumber_3,
      agntNm: "",
      agntSubCnt: this.agentSubCount_3,
      agntComsnSplt: this.agentCommissionSPlit_3,
      grpId: ""
    }
    if(this.agentNumber_0 !=="" || this.agentSubCount_0 !=="" || (this.agentCommissionSPlit_0 !=="" && this.agentCommissionSPlit_0 !== undefined) || this.agent_name !==""){
      groupAgents.push(agent1);
    }
    if(this.agentNumber_1 !=="" || this.agentSubCount_1 !=="" || (this.agentCommissionSPlit_1 !=="" && this.agentCommissionSPlit_1 !== undefined)){
      groupAgents.push(agent2);
    }
    if(this.agentNumber_2 !=="" || this.agentSubCount_2 !=="" || (this.agentCommissionSPlit_2 !=="" && this.agentCommissionSPlit_2 !== undefined)){
      groupAgents.push(agent3);
    }
    if(this.agentNumber_3 !=="" || this.agentSubCount_3 !=="" || (this.agentCommissionSPlit_3 !=="" && this.agentCommissionSPlit_3 !== undefined)){
      groupAgents.push(agent4);
    }

    let body = {

      "grpId": "0",
      "grpNbr": this.groupNumber,
      "grpNm": this.groupName,
      "grpEfftvDt": new Date(this.groupSetupFG.get('fcEffDate').value),
      "grpSitusSt": this.selectedState,
      // "actvFlg": "false",
      "actvFlg": this.isChecked.toString(),
      "occClass": parseInt(this.groupSetupOCC.get('FCOccControl').value),
      "grpPymn": parseInt(this.grpPymn),
      "enrlmntPrtnrsId": "",
      "enrlmntPrtnrsNm": this.EnrolmentPatnerName,
      "emlAddrss": this.EnrolEmailAddress,
      "grpAgents": groupAgents,
      "acctMgrNm": this.ManegerName,
      "acctMgrEmailAddrs": this.ManagerEmail,
      // "emailAddress": this.ManagerEmail || "",
      "acctMgrCntctId": 0,
      "isFPPGActive": this.isCheckedFppg,
      "isHIActive": this.isCheckedHospital,
      "hi": {
        effctv_dt: (new Date(this.hospitalIndemnityComponent.hospformgrp.value.FChospEffectiveDate)).toISOString(),
        grp_situs_state: this.hospitalIndemnityComponent.hospformgrp.value.FChospSitusState,
        effctv_dt_action: this.hospitalIndemnityComponent.hospformgrp.value.FChospEffectiveDate_Action,
        grp_situs_state_action: this.hospitalIndemnityComponent.hospformgrp.value.FChospSitusState_Action,

        sp_fname: this.hospitalIndemnityComponent.hospformgrp.value.FchospSpouseName ? '1' : '0',
        sp_dob: this.hospitalIndemnityComponent.hospformgrp.value.FchospSpouseDOB ? '1' : '0',
        sp_gndr: this.hospitalIndemnityComponent.hospformgrp.value.FchospSpouseGender ? '1' : '0',

        ch_fname_01: this.hospitalIndemnityComponent.hospformgrp.value.FchospChildName ? '1' : '0',
        ch_dob_01: this.hospitalIndemnityComponent.hospformgrp.value.FchospChildDOB ? '1' : '0',
        ch_gndr_01: this.hospitalIndemnityComponent.hospformgrp.value.FchospChildGender ? '1' : '0',

        rate_lvl: this.hospitalIndemnityComponent.hospformgrp.value.FChospRateLevel,
        rate_lvl_action: this.hospitalIndemnityComponent.hospformgrp.value.FChospRateLevel_Action,

        ch_fname_01_action: "10001",
        ch_dob_01_action: "10001",
        ch_gndr_01_action: "10001",
        sp_fname_action: "10001",
        sp_dob_action: "10001",
        sp_gndr_action: "10001",

        agnt_cd_1: this.agentformgrp.get('AgentNumberHospitalIndemnity').value,
        agnt_nm: this.agentformgrp.get('AgentNameHospitalIndemnity').value,
        agnt_comm_split_1: this.agentformgrp.get('CommissonSplitHospitalIndemnity').value===null ? "":this.agentformgrp.get('CommissonSplitHospitalIndemnity').value,

        agntsub_1: this.agentformgrp.get('AgentSubCountHospitalIndemnity').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1HospitalIndemnity').value,
        
        agnt_comm_split_2: this.agentformgrp.get('CommissonSplit1HospitalIndemnity').value===null ? "":this.agentformgrp.get('CommissonSplit1HospitalIndemnity').value,

        agntsub_2: this.agentformgrp.get('AgentSubCount1HospitalIndemnity').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2HospitalIndemnity').value,
        agnt_comm_split_3: this.agentformgrp.get('CommissonSplit2HospitalIndemnity').value===null ? "":this.agentformgrp.get('CommissonSplit2HospitalIndemnity').value,
        agntsub_3: this.agentformgrp.get('AgentSubCount2HospitalIndemnity').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3HospitalIndemnity').value,
        agnt_comm_split_4: this.agentformgrp.get('CommissonSplit3HospitalIndemnity').value===null ? "":this.agentformgrp.get('CommissonSplit3HospitalIndemnity').value,
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
        "effctv_dt": (new Date(this.fppgComponent.fppgformgrp.value.FCfppgEffectiveDate)).toISOString(),
        grp_situs_state: this.fppgComponent.fppgformgrp.value.FCfppgSitusState,
        emp_gi_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgEmpGIAmtMax,
        sp_gi_max_amt: this.fppgComponent.fppgformgrp.value.FCfppgSpouseGIAmtMax,
        // "myProperty": "",
        "sp_plan_cd": "",
        "emp_plan_cd": "",
        "ch_plan_cd": "",
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
        emp_gi_max_amt_action: "10001",
        sp_gi_max_amt_action: "10001",
        emp_qi_max_amt_action: "10001",
        sp_qi_max_amt_action: "10001",
        emp_max_amt_action: "10001",
        sp_max_amt_action: "10001",
        agnt_cd_1: this.agentformgrp.get('AgentNumberfppg').value,
        agnt_nm: this.agentformgrp.get('AgentNamefppg').value,
        agnt_comm_split_1: this.agentformgrp.get('CommissonSplitfppg').value===null ? "":this.agentformgrp.get('CommissonSplitfppg').value,
        agntsub_1: this.agentformgrp.get('AgentSubCountfppg').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1fppg').value,
        agnt_comm_split_2: this.agentformgrp.get('CommissonSplit1fppg').value===null ? "":this.agentformgrp.get('CommissonSplit1fppg').value,
        agntsub_2: this.agentformgrp.get('AgentSubCount1fppg').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2fppg').value,
        agnt_comm_split_3: this.agentformgrp.get('CommissonSplit2fppg').value===null ? "":this.agentformgrp.get('CommissonSplit2fppg').value,
        agntsub_3: this.agentformgrp.get('AgentSubCount2fppg').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3fppg').value,
        agnt_comm_split_4: this.agentformgrp.get('CommissonSplit3fppg').value===null ? "":this.agentformgrp.get('CommissonSplit3fppg').value,
        agntsub_4: this.agentformgrp.get('AgentSubCount3fppg').value,

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

        sp_fname: this.accidentComponent.accformgrp.value.FcaccSpouseName ? '1' : '0',
        sp_dob: this.accidentComponent.accformgrp.value.FcaccSpouseDOB ? '1' : '0',
        sp_gndr: this.accidentComponent.accformgrp.value.FcaccSpouseGender ? '1' : '0',
        ch_fname_01: this.accidentComponent.accformgrp.value.FcaccChildName ? '1' : '0',
        ch_dob_01: this.accidentComponent.accformgrp.value.FcaccChildDOB ? '1' : '0',
        ch_gndr_01: this.accidentComponent.accformgrp.value.FcaccChildGender ? '1' : '0',
        ch_fname_01_action: "10001",
        ch_dob_01_action: "10001",
        ch_gndr_01_action: "10001",
        sp_fname_action: "10001",
        sp_dob_action: "10001",
        sp_gndr_action: "10001",

        agnt_cd_1: this.agentformgrp.get('AgentNumberaccident').value,
        agnt_nm: this.agentformgrp.get('AgentNameaccident').value,
        agnt_comm_split_1: this.agentformgrp.get('CommissonSplitaccident').value===null ? "":this.agentformgrp.get('CommissonSplitaccident').value,
        agntsub_1: this.agentformgrp.get('AgentSubCountaccident').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1accident').value,
        agnt_comm_split_2: this.agentformgrp.get('CommissonSplit1accident').value===null ? "":this.agentformgrp.get('CommissonSplit1accident').value,
        agntsub_2: this.agentformgrp.get('AgentSubCount1accident').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2accident').value,
        agnt_comm_split_3: this.agentformgrp.get('CommissonSplit2accident').value===null ? "":this.agentformgrp.get('CommissonSplit2accident').value,
        agntsub_3: this.agentformgrp.get('AgentSubCount2accident').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3accident').value,
        agnt_comm_split_4: this.agentformgrp.get('CommissonSplit3accident').value===null ? "":this.agentformgrp.get('CommissonSplit3accident').value,
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
        "sp_plan_cd": "",
        "emp_plan_cd": "",
        "ch_plan_cd": "",
        "emp_plan_cd_action": this.empPaidCiComponent.empCIformgrp.value.FCempCIPlanCode_Action,
        "sp_plan_cd_action": this.empPaidCiComponent.empCIformgrp.value.FCempCIPlanCode_Action,
        "ch_plan_cd_action": this.empPaidCiComponent.empCIformgrp.value.FCempCIPlanCode_Action,
        "emp_ad_bnft": "",
        "emp_ad_bnft_action": "",
        "sp_ad_bnft":"",
        agnt_cd_1: this.agentformgrp.get('AgentNumberempPaidci').value,
        agnt_nm: this.agentformgrp.get('AgentNameempPaidci').value,
        agnt_comm_split_1: this.agentformgrp.get('CommissonSplitempPaidci').value===null ? "":this.agentformgrp.get('CommissonSplitempPaidci').value,
        agntsub_1: this.agentformgrp.get('AgentSubCountempPaidci').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1empPaidci').value,
        agnt_comm_split_2: this.agentformgrp.get('CommissonSplit1empPaidci').value===null ? "":this.agentformgrp.get('CommissonSplit1empPaidci').value,
        agntsub_2: this.agentformgrp.get('AgentSubCount1empPaidci').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2empPaidci').value,
        agnt_comm_split_3: this.agentformgrp.get('CommissonSplit2empPaidci').value===null ? "":this.agentformgrp.get('CommissonSplit2empPaidci').value,
        agntsub_3: this.agentformgrp.get('AgentSubCount2empPaidci').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3empPaidci').value,
        agnt_comm_split_4: this.agentformgrp.get('CommissonSplit3empPaidci').value===null ? "":this.agentformgrp.get('CommissonSplit3empPaidci').value,
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

        "sp_plan_cd": "",
        "emp_plan_cd": "",
        "ch_plan_cd": "",

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
      
"ch_gi_max_amt": this.VolCiComponent.volCIformgrp.value.FCVolCIChildAmtMax_Action,
​
"ch_max_amt": this.VolCiComponent.volCIformgrp.value.FCVolCIChildAmtMax,
​
"ch_gi_max_amt_action": this.VolCiComponent.volCIformgrp.value.FCVolCIChildGIAmtMax,
​
"ch_max_amt_action": this.VolCiComponent.volCIformgrp.value.FCVolCIChildAmtMax_Action,

        agnt_cd_1: this.agentformgrp.get('AgentNumbervolCi').value,
        agnt_nm: this.agentformgrp.get('AgentNamevolCi').value,
        agnt_comm_split_1: this.agentformgrp.get('CommissonSplitvolCi').value===null ? "":this.agentformgrp.get('CommissonSplitvolCi').value,
        agntsub_1: this.agentformgrp.get('AgentSubCountvolCi').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1volCi').value,
        agnt_comm_split_2: this.agentformgrp.get('CommissonSplit1volCi').value===null ? "":this.agentformgrp.get('CommissonSplit1volCi').value,
        agntsub_2: this.agentformgrp.get('AgentSubCount1volCi').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2volCi').value,
        agnt_comm_split_3: this.agentformgrp.get('CommissonSplit2volCi').value===null ? "":this.agentformgrp.get('CommissonSplit2volCi').value,
        agntsub_3: this.agentformgrp.get('AgentSubCount2volCi').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3volCi').value,
        agnt_comm_split_4: this.agentformgrp.get('CommissonSplit3volCi').value===null ? "":this.agentformgrp.get('CommissonSplit3volCi').value,
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
        agnt_comm_split_1: this.agentformgrp.get('CommissonSplitVolGrpLife').value===null ? "":this.agentformgrp.get('CommissonSplitVolGrpLife').value,
        agntsub_1: this.agentformgrp.get('AgentSubCountVolGrpLife').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1VolGrpLife').value,
        agnt_comm_split_2: this.agentformgrp.get('CommissonSplit1VolGrpLife').value===null ? "":this.agentformgrp.get('CommissonSplit1VolGrpLife').value,
        agntsub_2: this.agentformgrp.get('AgentSubCount1VolGrpLife').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2VolGrpLife').value,
        agnt_comm_split_3: this.agentformgrp.get('CommissonSplit2VolGrpLife').value===null ? "":this.agentformgrp.get('CommissonSplit2VolGrpLife').value,
        agntsub_3: this.agentformgrp.get('AgentSubCount2VolGrpLife').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3VolGrpLife').value,
        agnt_comm_split_4: this.agentformgrp.get('CommissonSplit3VolGrpLife').value===null ? "":this.agentformgrp.get('CommissonSplit3VolGrpLife').value,
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
        agnt_comm_split_1: this.agentformgrp.get('CommissonSplitBasicgrpLife').value===null ? "":this.agentformgrp.get('CommissonSplitBasicgrpLife').value,
        agntsub_1: this.agentformgrp.get('AgentSubCountBasicgrpLife').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1BasicgrpLife').value,
        agnt_comm_split_2: this.agentformgrp.get('CommissonSplit1BasicgrpLife').value===null ? "":this.agentformgrp.get('CommissonSplit1BasicgrpLife').value,
        agntsub_2: this.agentformgrp.get('AgentSubCount1BasicgrpLife').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2BasicgrpLife').value,
        agnt_comm_split_3: this.agentformgrp.get('CommissonSplit2BasicgrpLife').value===null ? "":this.agentformgrp.get('CommissonSplit2BasicgrpLife').value,
        agntsub_3: this.agentformgrp.get('AgentSubCount2BasicgrpLife').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3BasicgrpLife').value,
        agnt_comm_split_4: this.agentformgrp.get('CommissonSplit3BasicgrpLife').value===null ? "":this.agentformgrp.get('CommissonSplit3BasicgrpLife').value,
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
        "sp_plan_cd": "",
        "emp_plan_cd": "",
        "ch_plan_cd": "",
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
        "emp_gi_max_amt_action": "10001",
        "sp_gi_max_amt_action":"10001",
        "emp_qi_max_amt_action": "10001",
        "sp_qi_max_amt_action": "10001",
        "emp_max_amt_action": "10001",
        "sp_max_amt_action": "10001",
        agnt_cd_1: this.agentformgrp.get('AgentNumberFppIndivisual').value,
        agnt_nm: this.agentformgrp.get('AgentNameFppIndivisual').value,
        agnt_comm_split_1: this.agentformgrp.get('CommissonSplitFppIndivisual').value===null ? "":this.agentformgrp.get('CommissonSplitFppIndivisual').value,
        agntsub_1: this.agentformgrp.get('AgentSubCountFppIndivisual').value,
        agnt_cd_2: this.agentformgrp.get('AgentNumber1FppIndivisual').value,
        agnt_comm_split_2: this.agentformgrp.get('CommissonSplit1FppIndivisual').value===null ? "":this.agentformgrp.get('CommissonSplit1FppIndivisual').value,
        agntsub_2: this.agentformgrp.get('AgentSubCount1FppIndivisual').value,
        agnt_cd_3: this.agentformgrp.get('AgentNumber2FppIndivisual').value,
        agnt_comm_split_3: this.agentformgrp.get('CommissonSplit2FppIndivisual').value===null ? "":this.agentformgrp.get('CommissonSplit2FppIndivisual').value,
        agntsub_3: this.agentformgrp.get('AgentSubCount2FppIndivisual').value,
        agnt_cd_4: this.agentformgrp.get('AgentNumber3FppIndivisual').value,
        agnt_comm_split_4: this.agentformgrp.get('CommissonSplit3FppIndivisual').value===null ? "":this.agentformgrp.get('CommissonSplit3FppIndivisual').value,
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

    if(this.editServiceCall){
    
      body.grpId = this.groupsData.grpId;
      this.eppcreategroupservice.postEppEdit(body).subscribe(
        (data: any) => {
        console.log("Edit Response data", data);
      },
      (err:any) => {
        if(err.status===200){
          this.toastr.success(err.error.text,'Success',{
              timeOut:3000,
            });

        }
        else if(err.status===400){
          this.toastr.error(err.error,'Error',{
            timeOut:3000,
          }); 
        }
       
      }
      
      );
    }
     else {
      if(!form.invalid){
        console.log("form.invalid",form.invalid);
        this.eppcreategroupservice.PosteppCreate(body).subscribe((response: any) => {
          console.log("response",response);
        },
    
      (error:any) =>{
        if(error.status===200){
          this.toastr.success(error.error.text,'Success',{
              timeOut:3000,
              
            });
          
            this.router.navigate(['/group-setup', this.groupNumber]);
        }
        
        else if(error.status===400){
          this.toastr.error(error.error,'Error',{
            timeOut:3000,
          }); 
        }
      }
      );
      }
      else{
        this.toastr.error('Please fill the required fields mark by the red asterisk!','Error',{
          timeOut:3000,
        });
      }
    }
   

  }

}

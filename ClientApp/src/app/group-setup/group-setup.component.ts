import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { LookupService } from '../services/lookup.service';
interface state {
  value: string;
  viewValue: string;
}
interface place {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-group-setup',
  templateUrl: './group-setup.component.html',
  styleUrls: ['./group-setup.component.css']
})
export class GroupSetupComponent implements OnInit {
  public product: any;
  public addedProducts = [];
  public selectedProducts: any = [];
  titleName: string = "";
  selectedOption = [];
  accident = "";

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  public minDate = new Date().toISOString().slice(0,10);

  myForm: FormGroup;

  public dataList = [
    { name: 'Accident' },
    { name: 'Hospital Indemnity' },
    { name: 'Basic Group Life' },
    { name: 'Employer Paid CI' },

  ]

  date: FormControl;

  states: state[] = [
    { value: 'steak-0', viewValue: 'Accident Situs State' },
    { value: 'pizza-1', viewValue: 'Hospital Situs State' },
    { value: 'tacos-2', viewValue: 'Employer Paid Ci Situs State' },
    { value: 'tacos-3', viewValue: 'Basic Group Situs State' }
  ];

  places: place[] = [
    { value: 'On or Off the Job', viewValue: 'On or Off the Job' },
    { value: 'On the Job Only', viewValue: 'On the Job Only' },
    { value: 'Off the Job Only', viewValue: 'Off the Job Only' }
  ];

  selectedValue = this.states[0].value;
  selectedPlace = this.places[0].value;
  selectedData = this.dataList[0].name;
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

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private lookupService: LookupService) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      groupSetup: this.formBuilder.array([])
    });

    this.lookupService.getLookupsData()
      .subscribe((data: any) => {
        this.isLoading = true;
        console.log("data", data);
        this.lookUpDataPaymentModes = Object.values(data.paymentMode);
        this.lookUpDataSitusStates = Object.values(data.situsState);
        
      });

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
    // this.titleName = this.addedProducts.toString();

  }
  deleteProduct(product) {
    if (this.addedProducts.indexOf(product) > -1) {
      this.addedProducts.splice(this.addedProducts.indexOf(product), 1);
    }
  }

  selected(event: any) {
    console.log(event)
    this.selectedProducts.push(event.value);
    this.selectedOption = [...new Set(this.selectedProducts)]
    // console.log('products added ' , this.selectedProducts);

  }

  addAccident(value: any) {
    this.accident = value;
  }

  addfppg(value: any) {
    this.fppg = value;
  }
  addhospitalIndemity(value: any) {
    this.hospitalIndemity = value;
  }
  addfppIndivisual(value: any) {
    this.fppIndivisual = value;
  }
  addemployerPaidCi(value: any) {
    this.employerPaidCi = value;
  }
  // addvoluntaryCi(value:any){
  //   this.voluntaryCi = value;
  // }
  // addvolGroup(value:any){
  //   this.volGroup = value;
  // }
  // addbasicGroup(value:any){
  //   this.basicGroup = value;
  // }

  getLookupValuePaymentMode(value: any) {
    this.lookupPaymentMethodvalue = value;
  }

  getLookupValueSitusState(value: any){
    this.lookupSitusStateValue = value;
  }
}

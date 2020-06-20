import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { LookupService } from '../services/lookup.service';
import { ThemePalette } from '@angular/material';
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
  checkedToggle = "Inactive";
  toggleActiveColor: ThemePalette = "primary";
  groupNumber = "";
  grpNumber = {
    grpNbr:""
  }
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  public minDate = new Date().toISOString().slice(0,10);
  dateChange:any;
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
  groupName: "";
  grpEfftvDate: "";
  grpPymn: "";
  grpNm: { grpNm: ""; };
  grpEfftvDt: { grpEfftvDt: ""; };
  occ: { occClass: ""; };
  occClass: any;
  grpPym: { grpPymn: ""; };
  grpSitusState = "";
  situsStateObj = {
    grpSitusSt: ""
  }

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private lookupService: LookupService) {
  }

  ngOnInit() {

    this.lookupService.getLookupsData()
      .subscribe((data: any) => {
        this.isLoading = true;
        console.log("data", data);
        this.lookUpDataPaymentModes = (data.paymentMode.map((payment)=>{
          return payment.formattedData;
        }));
        this.lookUpDataSitusStates = (data.situsState);
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

  getLookupValuePaymentMode(value: any) {
    this.lookupPaymentMethodvalue = value;
    this.grpPymn = value;
  }

  getLookupValueSitusState(value: any){
    this.lookupSitusStateValue = value;
    this.grpSitusState = value;
  }

  onDateChange(dateValue:any){
  this.dateChange = dateValue.srcElement.value;
  console.log("dateValue",this.dateChange);
  }

  toggleChange(event:any){
    console.log(event);
    if(event.checked){
      this.checkedToggle = "Active";
    }
    else{
      this.checkedToggle = "Inactive";
    }
     
  }
  onSubmit(){
    this.grpNumber = {
      grpNbr: this.groupNumber
    }
console.log(this.grpNumber);
    this.grpNm = {
      grpNm: this.groupName
    }
    console.log(this.grpNm)
    this.grpEfftvDt = {
      grpEfftvDt: this.grpEfftvDate
    }
    console.log(this.grpEfftvDt)
    this.grpPym = {
      grpPymn: this.grpPymn
    }
    console.log(this.grpPym)
    this.occ = {
      occClass: this.occClass
    }
    console.log(this.occ);
    this.situsStateObj = {
      grpSitusSt: this.grpSitusState
    }
    console.log("this.situsStateObj",this.situsStateObj);
  }

}

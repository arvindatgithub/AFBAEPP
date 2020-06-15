import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray,FormControl } from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
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
  public product : any; 
  public addedProducts = [];
  public selectedProducts: any = [];
  titleName:string = "";
  selectedOption = [];

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  minDate=new Date();

  myForm: FormGroup;

  public dataList = [
    {name: 'Accident'}, 
    {name: 'Hospital Indemnity'},
    {name: 'Basic Group Life'},
    {name: 'Employer Paid CI'},
   
  ]

  date: FormControl;

  states: state[] = [
    {value: 'steak-0', viewValue: 'Accident Situs State'},
    {value: 'pizza-1', viewValue: 'Hospital Situs State'},
    {value: 'tacos-2', viewValue: 'Employer Paid Ci Situs State'},
    {value: 'tacos-3', viewValue: 'Basic Group Situs State'}
  ];

  places: place[] = [
    {value: 'On or Off the Job', viewValue: 'On or Off the Job'},
    {value: 'On the Job Only', viewValue: 'On the Job Only'},
    {value: 'Off the Job Only', viewValue: 'Off the Job Only'}
  ];

  selectedValue = this.states[0].value;
  selectedPlace = this.places[0].value;
  selectedData = this.dataList[0].name;

  constructor(private formBuilder: FormBuilder,private snackBar: MatSnackBar){
  }

  ngOnInit(){
    this.myForm = this.formBuilder.group({
      groupSetup: this.formBuilder.array([])
    })
  }

  
  addProducts() {
     this.selectedOption.findIndex((ele,i)=> {
      if(this.addedProducts.indexOf(ele) == i){
        this.snackBar.open(this.addedProducts +" "+ "Already Added", 'Close',{
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['red-snackbar']
        });
      }
      else{
        this.addedProducts = [...this.selectedOption];
        this.snackBar.open(this.addedProducts +" "+ "Added Successfully", 'Close',{
          duration: 3000,
          verticalPosition: 'top',
          panelClass:['blue-snackbar']
        });
      }
    });
    // this.titleName = this.addedProducts.toString();
    
  }
  deleteProduct(product){
    if (this.addedProducts.indexOf(product) > -1) {
      this.addedProducts.splice(this.addedProducts.indexOf(product), 1);
    }
  }

  selected(event:any) {
    console.log(event)
    this.selectedProducts.push(event.value);
    this.selectedOption =  [...new Set(this.selectedProducts)]
    // console.log('products added ' , this.selectedProducts);
    
  }
}

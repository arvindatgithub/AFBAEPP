import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray,FormControl } from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';
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

  accidentProductSelected: boolean = false;
  fppgProductSelected: boolean = false;
  fppgIndivProductSelected: boolean =false;
  hospProductSelected: boolean = false;
  addedProducts:any =[];


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

  constructor(private formBuilder: FormBuilder){
  }

  ngOnInit(){
    this.myForm = this.formBuilder.group({
      groupSetup: this.formBuilder.array([])
    })
  }

  addProducts() {
    // const group = this.myForm.controls.groupSetup as FormArray;
    
    // group.push(this.formBuilder.group({
    //   input1: new FormControl('data'),
    //   date: new Date(),
    //   selectState: new FormControl(),
    //   selectPlace:this.places[0].value,
    //   dltButton:''
    // }));
    this.addedProducts.forEach(element => {
      if(element === "Accident"){
        this.accidentProductSelected = true;
      }else if(element === "FPPG"){
        this.fppgProductSelected = true;
      }else if(element === "FPP Individual"){
        this.fppgIndivProductSelected = true;
      }else if(element === "Hospital Indemnity"){
        this.hospProductSelected = true;
      }
    });

  }

  deleteAccident(){
    this.accidentProductSelected = false;
  }

  selectedProducts(value) {
    this.addedProducts.push(value);
    console.log('producta added' + this.addedProducts);
    
  }
}

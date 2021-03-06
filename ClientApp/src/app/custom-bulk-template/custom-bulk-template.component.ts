import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CustomeppattributeService } from '../services/customeppattribute.service';
import * as XLSX from 'xlsx';
import { ExcelService } from '../services/excel.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-custom-bulk-template',
  templateUrl: './custom-bulk-template.component.html',
  styleUrls: ['./custom-bulk-template.component.css']
})
export class CustomBulkTemplateComponent implements OnInit {

  productsList: any;

  selectedProduct: any;
  grpNum: any;
  selectedProductId: string;

  availableFields: any;
  selectedFields: any;

  fieldsByGrpPrdt: any;
  editFlag:boolean;
  userData = {
    groupNumber: '',
    product: '',
  };
  
  submitted = false;
  grpprdctId: any;
  successMsg = false;
  groupExistsShowLists = false;
  enableCloneSecFlag = true;
  cloneGroupNumber ='';
  cloneLists: any;
  isChecked = false;

  constructor(private customattributeService: CustomeppattributeService, private excelService: ExcelService) {

  }

  ngOnInit() {
    this.customattributeService.getEppProducts().subscribe((data) => {
      this.productsList = data;
    });
  }

  onSubmit(form, formData) {
    console.log('form data' + JSON.stringify(formData.product));
    this.grpNum = formData.groupNumber;
    this.selectedProduct = formData.product;
    this.productsList.forEach(element => {
      if(element.productNm == this.selectedProduct){
        this.selectedProductId = element.productId;
      }
    });
    console.log('selected product'+ this.selectedProduct + '  ' + this.selectedProductId);
    this.getFields(this.grpNum, this.selectedProductId);
  }

  CloneSubmit() {
    console.log('clone form data'+ this.cloneGroupNumber);
    this.customattributeService.getCloneCustomExistingGroup(this.cloneGroupNumber, this.selectedProductId).subscribe(
      (data) => {
      this.cloneLists = data;
      console.log('cloned data'+ JSON.stringify(data));
      this.availableFields = this.cloneLists.availableList;
      this.selectedFields = this.cloneLists.selectedList;
      this.editFlag = this.cloneLists.isEdit;
      //this.grpNum = this.cloneGroupNumber;
      this.grpprdctId = this.cloneLists.grpprdctId;
    },
    (err) => {
      alert("Group not exists");
    });
  }

  getFields(grpNbr, productId) {
    this.groupExistsShowLists = false;
    this.enableCloneSecFlag = true;
    this.customattributeService.getProductFieldsByGroup(grpNbr, productId).subscribe(
      data => {
        console.log('data by group ' + JSON.stringify(data));
        this.groupExistsShowLists = true;
        this.fieldsByGrpPrdt = data;
        this.availableFields = this.fieldsByGrpPrdt.availableList;
        this.selectedFields = this.fieldsByGrpPrdt.selectedList;
        this.editFlag = this.fieldsByGrpPrdt.isEdit;
        this.grpprdctId = this.fieldsByGrpPrdt.grpprdctId;

       
      }, err => {
        console.log("error occurred " + err.status);
        this.groupExistsShowLists = false;
        alert(" Template for this group product is not available.");
      }, () => {
        console.log('service call completed');
        if(this.selectedFields.length == 0 ){
          //alert("Do you want to clone the Existing Group Template");
          this.enableCloneSecFlag = false;
        }
      }

    );

  }

  updateCheckedOptions(option, event) {
    console.log('option', JSON.stringify(option) + " event " + JSON.stringify(event));
    console.log(this.selectedFields);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    console.log(this.selectedFields);
  }

  exportAsXLSX() {
    let excelFields = [];
    let tempObj = {};
    for(let i=0; i<this.selectedFields.length; i++){
      this.selectedFields[i].clmnOrdr = i+1;
      tempObj[this.selectedFields[i].displyAttrNm] = ''; 
    }
    console.log('object' + JSON.stringify(tempObj));
    excelFields[0]=tempObj;
    let todayDate = new Date().toISOString().slice(0,10);
    todayDate = todayDate.slice(0,4)+ todayDate.slice(5,7)+todayDate.slice(8,10);
    this.excelService.exportExcel(excelFields, this.grpNum+'Enrollment_'+this.selectedProduct+'_'+todayDate);

  }

  saveLayout() {
    for(let i=0; i<this.selectedFields.length; i++){
      this.selectedFields[i].clmnOrdr = i+1;
    }
    for(let i=0; i<this.selectedFields.length; i++){
      this.selectedFields[i].clmnOrdr = this.selectedFields[i].clmnOrdr.toString();
    }
    let reqObj = {
      grpNbr: this.grpNum,
      productId: this.selectedProductId.toString(),
      grpprdctId: this.grpprdctId.toString(),
      eppPrdAttrFields: this.selectedFields,
      isEdit: this.editFlag
    };
    console.log('request obj *** ' + JSON.stringify(reqObj));
    if (this.editFlag) {
      this.customattributeService.editProdAttr(reqObj).subscribe(
        data => {
        console.log('edit request response status' + data);
      }, err => {
        console.log('edit save api'+ err.status);
        if(err.status == 200){
          this.successMsg = true;
          this.getFields(this.grpNum,this.selectedProductId);
        } else{
          this.successMsg = false;
        }
      });
    } else {
      console.log('request obj' + JSON.stringify(reqObj));
      this.customattributeService.addProdAttr(reqObj).subscribe(
        data => {
        console.log('Add request response status' + data);
      }, err => {
        console.log('add save api'+ err.status);
        if(err.status == 200){
          this.successMsg = true;
          this.getFields(this.grpNum,this.selectedProductId);
        } else{
          this.successMsg = false;
        }
      });
    }
  }

}

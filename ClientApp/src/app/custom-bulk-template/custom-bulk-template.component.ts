import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CustomeppattributeService } from '../services/customeppattribute.service';
import * as XLSX from 'xlsx';
import { ExcelService } from '../services/excel.service';

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
  fieldsByPrdt: any;
  editFlag:boolean;
  userData = {
    groupNumber: '',
    product: '',
  };
  submitted = false;


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
    this.getFields(this.grpNum, this.selectedProduct, this.selectedProductId);
  }

  getFields(grpNbr, productNm, productId) {

    this.customattributeService.getProductFieldsByGroup(grpNbr, productId).subscribe(
      data => {
        console.log('data by group ' + JSON.stringify(data));
        this.fieldsByGrpPrdt = data;
        this.availableFields = this.fieldsByGrpPrdt.availableList;
        this.selectedFields = this.fieldsByGrpPrdt.selectedList;
        this.editFlag = this.fieldsByGrpPrdt.isEdit;
      }, err => {
        console.log("error occurred " + err.status);
        //this.editFlag = false;
        //this.customattributeService.getProductFields(productNm).subscribe((data) => {
        //  console.log('data by products' + JSON.stringify(data));
        //  this.fieldsByPrdt = data;
        //  this.availableFields = this.fieldsByPrdt.availableList;
        //  this.selectedFields = this.fieldsByPrdt.selectedList;
        //});
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
      tempObj[this.selectedFields[i].dbAttrNm] = ''; 
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
    let reqObj = {
      grpNbr: this.grpNum,
      productId: this.selectedProductId.toString(),
      eppPrdAttrFields: this.selectedFields,
      isEdit: this.editFlag
    };
    console.log('request obj *** ' + JSON.stringify(reqObj));
    if (this.editFlag) {
      this.customattributeService.editProdAttr(reqObj).subscribe(
        data => {
        console.log('edit request response' + data);
      }, err => {
        console.log('edit save api'+ err.status);
      });
    } else {
      console.log('request obj' + JSON.stringify(reqObj));
      this.customattributeService.addProdAttr(reqObj).subscribe(
        data => {
        console.log('Add request response' + data);
      }, err => {
        console.log('add save api'+ err.status);
      });
    }
  }

}

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
    this.grpNum = formData.groupNumber;
    this.selectedProduct = formData.product;
    this.getFields(this.grpNum, this.selectedProduct);
  }

  getFields(grpNbr, productNm) {

    this.customattributeService.getProductFieldsByGroup(grpNbr, productNm).subscribe(
      data => {
        console.log('data by group ' + JSON.stringify(data));
        this.fieldsByGrpPrdt = data;
        this.availableFields = this.fieldsByGrpPrdt.availableList;
        this.selectedFields = this.fieldsByGrpPrdt.selectedList;
        this.editFlag = true;
      }, err => {
        console.log("error occurred " + err.status);
        this.editFlag = false;
        this.customattributeService.getProductFields(productNm).subscribe((data) => {
          console.log('data by products' + JSON.stringify(data));
          this.fieldsByPrdt = data;
          this.availableFields = this.fieldsByPrdt.availableList;
          this.selectedFields = this.fieldsByPrdt.selectedList;
        });
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
    this.excelService.exportExcel(this.selectedFields, 'customFile');

  }

  saveLayout() {
    for(let i=0; i<this.selectedFields.length; i++){
      this.selectedFields[i].clmnOrdr = i+1;
    }
    let reqObj = {
      grpNbr: this.grpNum,
      productNm: this.selectedProduct,
      eppPrdAttrFields: this.selectedFields,
      isEdit: this.editFlag
    };
    if (this.editFlag) {
      reqObj.isEdit = true;
      this.customattributeService.editProdAttr(reqObj).subscribe((data) => {
        console.log('edit request response' + data);
      });
    } else {
      console.log('request obj' + JSON.stringify(reqObj));
      this.customattributeService.addProdAttr(reqObj).subscribe((data) => {
        console.log('Add request response' + data);
      });
    }
  }

}

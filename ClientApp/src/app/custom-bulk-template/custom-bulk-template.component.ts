import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
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
  selectedProduct = '';
  grpNum = '';
  availableFields : any;
  selectedFields : any;
  FPPGselected = [];

  constructor( private customattributeService: CustomeppattributeService, private excelService: ExcelService) {
   
  }

  ngOnInit() {
    
    this.customattributeService.getEppProducts().subscribe((data) => {
      this.productsList = data;
    });

  }
  getProductTemplate(product){
    console.log('value '+ product +'selected product'+ this.selectedProduct);
     this.customattributeService.getProductFields(product).subscribe((data) => {
       let dataLists: any = data;
      this.availableFields = dataLists.availableList;
      this.selectedFields = dataLists.selectedList;
    });
  
  }
  
  updateCheckedOptions(option, event){
    console.log('option', JSON.stringify(option) + " event " + JSON.stringify(event) );
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
    let reqObj= {
      groupNum: this.grpNum,
      productNm: this.selectedProduct,
      selectedList: this.selectedFields
    };
    console.log(' request obj '+JSON.stringify(reqObj));

  }


}

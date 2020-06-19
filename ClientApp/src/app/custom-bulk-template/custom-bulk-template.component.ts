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
  availableFields : any;
  //   { name:'Available1', checked:false},
  //   { name:'Available', checked:false},
  //   { name:'Available3', checked:false},
  //   { name:'Available4', checked:false},
  //   { name:'Available5', checked:false},
  // ];
  selectedFields : any;
  FPPGselected = [];
  requiredFieldsFPPG = ['emp_hire_dt','effctv_dt','grp_nmbr','emp_sig_dt','agnt_cd_1','agntsub_1',
  'agnt_comm_split_1','owners_lname','owners_fname','owners_ssn','owners_addr_ln_1',
  'owners_addr_city','owners_addr_state','owners_addr_zip','emp_plan_cd'];
  
  // selectedFields = [
  //   {name:'OptionA', value:'1', checked:true},
  //   {name:'OptionB', value:'2', checked:false},
  //   {name:'OptionC', value:'3', checked:true}
  // ]

  constructor( private customattributeService: CustomeppattributeService, private excelService: ExcelService) {
    //Service to get Available fields
    this.customattributeService.getAvailableFields().subscribe((data) => {
      this.availableFields = data;
     // console.log('AVAILABLE ' + JSON.stringify(this.availableFields));
    });

    //service to get selected fields
   this.customattributeService.getSelectedFields().subscribe((data) => {
    let selectedData : any = data;
    this.selectedFields = selectedData.FPPG;
    console.log('SELECTED ' + JSON.stringify(this.selectedFields));
  });
}

  ngOnInit() {
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

  exportAsXLSX(){
    this.excelService.exportExcel(this.selectedFields, 'customFile');

  }

}

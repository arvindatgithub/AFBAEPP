import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CustomeppattributeService } from '../services/customeppattribute.service';

@Component({
  selector: 'app-custom-bulk-template',
  templateUrl: './custom-bulk-template.component.html',
  styleUrls: ['./custom-bulk-template.component.css']
})
export class CustomBulkTemplateComponent implements OnInit {
  requiredFields = [];
  optionalFields = [];
  selectedFields = [];

  requiredFieldsFPPG = ['emp_hire_dt','effctv_dt','grp_nmbr','emp_sig_dt','agnt_cd_1','agntsub_1',
  'agnt_comm_split_1','owners_lname','owners_fname','owners_ssn','owners_addr_ln_1',
  'owners_addr_city','owners_addr_state','owners_addr_zip','emp_plan_cd'];
  

  constructor( private customattributeService: CustomeppattributeService) {
    this.customattributeService.getAttributes().subscribe((data) => {
      let attr: any = data;
      attr.forEach(element => {
        this.optionalFields.push(element.dbAttrNm);
      });
      console.log(this.optionalFields);
    });

   }

  ngOnInit() {
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
  }


}

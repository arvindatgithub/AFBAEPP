import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CustomeppattributeService } from '../services/customeppattribute.service';

@Component({
  selector: 'app-custom-bulk-template',
  templateUrl: './custom-bulk-template.component.html',
  styleUrls: ['./custom-bulk-template.component.css']
})
export class CustomBulkTemplateComponent implements OnInit {

  optionalFields = [];
  requiredFields = [];

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

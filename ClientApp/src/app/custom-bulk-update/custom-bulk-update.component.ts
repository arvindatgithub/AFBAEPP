import { Component, OnInit } from '@angular/core';
import { CustomeppattributeService } from '../services/customeppattribute.service';


@Component({
  selector: 'app-custom-bulk-update',
  templateUrl: './custom-bulk-update.component.html',
  styleUrls: ['./custom-bulk-update.component.css']
})
export class CustomBulkUpdateComponent implements OnInit {

  questionsList : any;
  grpNbr: any;
  questionListByGroup: any;
  grpNbrErr= false;
  grpNbrEmpty= false;

  constructor(private customattributeService: CustomeppattributeService) { }

  ngOnInit() {
    console.log('questions ');
    this.customattributeService.getQuestionAttr().subscribe((data) => {
      this.questionsList = data;
      console.log(this.questionsList);
    });

  }

  getQuestionsByGrp() {
    this.grpNbrEmpty = false;
    this.grpNbrErr = false;
    console.log('grp num'+ this.grpNbr);
    if(this.grpNbr !== '' && this.grpNbr !== undefined){
      if(this.grpNbr.length == 5){
        // this.customattributeService.getGroupQuestionAttr(this.grpNbr).subscribe((data) => {
        //   this.questionListByGroup = data;
        //   console.log(this.questionListByGroup);
        // });
      } else {
        this.grpNbrErr = true;
      }
    } else{
      this.grpNbrEmpty = true;
    }
    
   
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-fppg',
  templateUrl: './fppg.component.html',
  styleUrls: ['./fppg.component.css']
})
export class FPPGComponent implements OnInit {
  @Input() lookupValue: any;
  
  public isLoading = false;
  lookUpDataSitusStates: any = [];
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  public minDate = new Date().toISOString().slice(0,10);
  situsState:any;

  constructor(private lookupService: LookupService) { }

  ngOnInit() {
    this.lookupService.getLookupsData()
      .subscribe((data: any) => {
        this.isLoading = true;
        console.log("data", data);
        this.lookUpDataSitusStates = (data.situsState);
      });


  }

//   addPost(){
//     console.log("form",form);
//     form.resetForm(); 
// }
  
 

}

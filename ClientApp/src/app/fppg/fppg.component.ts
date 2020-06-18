import { Component, OnInit, Input } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { NgForm, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-fppg',
  templateUrl: './fppg.component.html',
  styleUrls: ['./fppg.component.css']
})
export class FPPGComponent implements OnInit {
  @Input() lookupValue: any;
  @Input() dateValue: any;
  situsValue:string;
  // subscription: Subscription;
  public isLoading = false;
  lookUpDataSitusStates: any = [];
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  public minDate = new Date().toISOString().slice(0,10);

  constructor(private lookupService: LookupService) {
    // this.subscription = this.lookupService.getSitusValue().subscribe((situsValue:string)=>{
    //   this.situsValue = situsValue;
    //   console.log("this.situsValue",this.situsValue);
    // });
   }

  ngOnInit() {
    this.lookupService.getLookupsData()
      .subscribe((data: any) => {
        this.isLoading = true;
        console.log("data", data);
        this.lookUpDataSitusStates = data.situsState;
      });
    


  }

}

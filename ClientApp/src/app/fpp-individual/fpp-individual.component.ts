import { Component, OnInit, Input } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-fpp-individual',
  templateUrl: './fpp-individual.component.html',
  styleUrls: ['./fpp-individual.component.css']
})
export class FPPIndividualComponent implements OnInit {
  @Input() lookupValue: any;
  @Input() dateValue: any;
  situsValue:string;
  subscription: Subscription;
  public isLoading = false;
  lookUpDataSitusStates: any = [];
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  public minDate = new Date().toISOString().slice(0,10);
  situsState:any;
  
  constructor(private lookupService: LookupService) {
    // this.subscription = this.lookupService.getSitusValue().subscribe((situsValue:string)=>{
    //   this.situsValue = situsValue;
    //   console.log("this.situsValue",this.situsValue);
    // })
   } 

  ngOnInit() {
    this.lookupService.getLookupsData()
    .subscribe((data: any) => {
      this.isLoading = true;
      console.log("data", data);
      this.lookUpDataSitusStates = (data.situsState);
    });
    
  }
 
}

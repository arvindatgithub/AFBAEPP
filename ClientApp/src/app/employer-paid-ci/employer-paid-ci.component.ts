import { Component, OnInit, Input } from '@angular/core';
import { LookupService } from '../services/lookup.service';
@Component({
  selector: 'app-employer-paid-ci',
  templateUrl: './employer-paid-ci.component.html',
  styleUrls: ['./employer-paid-ci.component.css']
})
export class EmployerPaidCIComponent implements OnInit {
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

  constructor(private lookupService: LookupService) { }

  ngOnInit() {
    this.lookupService.getLookupsData()
    .subscribe((data: any) => {
      this.isLoading = true;
      console.log("data", data);
      this.lookUpDataSitusStates = data.situsState;
    });
  }
  // getLookupValueSitusState(value: any){
  //   this.lookupSitusStateValue = value;
  // }

}

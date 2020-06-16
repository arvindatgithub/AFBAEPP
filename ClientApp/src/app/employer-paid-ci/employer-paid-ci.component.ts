import { Component, OnInit, Input } from '@angular/core';
import { LookupService } from '../services/lookup.service';
@Component({
  selector: 'app-employer-paid-ci',
  templateUrl: './employer-paid-ci.component.html',
  styleUrls: ['./employer-paid-ci.component.css']
})
export class EmployerPaidCIComponent implements OnInit {
  lookUpDataSitusStates: any = [];
  public lookupSitusStateValue = "";
  public isLoading = false;
  @Input() lookupSitusState:string;
  public minDate = new Date().toISOString().slice(0,10);

  constructor(private lookupService: LookupService) { }

  ngOnInit() {
    this.lookupService.getLookupsData()
    .subscribe((data: any) => {
      this.isLoading = true;
    
     // this.lookUpDataPaymentModes = Object.values(data.paymentMode);
      this.lookUpDataSitusStates = Object.values(data.situsState);
      
    });
  }
  getLookupValueSitusState(value: any){
    this.lookupSitusStateValue = value;
  }

}

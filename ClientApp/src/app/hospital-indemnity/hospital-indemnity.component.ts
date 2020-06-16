import { Component, OnInit, Input } from '@angular/core';
import { LookupService } from '../services/lookup.service';
@Component({
  selector: 'app-hospital-indemnity',
  templateUrl: './hospital-indemnity.component.html',
  styleUrls: ['./hospital-indemnity.component.css']
})
export class HospitalIndemnityComponent implements OnInit {
  public minDate = new Date().toISOString().slice(0,10);
  lookUpDataSitusStates: any = [];
  public lookupSitusStateValue = "";
  public isLoading = false;
  @Input() lookupSitusState: any;

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

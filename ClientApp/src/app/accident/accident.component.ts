import { Component, OnInit, Input } from '@angular/core';
import { LookupService } from '../services/lookup.service';
@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.css']
})
export class AccidentComponent implements OnInit {
  @Input() lookupSitusState: any;
  public minDate = new Date().toISOString().slice(0,10);
  checked: any
  lookUpDataSitusStates: any = [];
  public lookupSitusStateValue = "";
  public isLoading = false;
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

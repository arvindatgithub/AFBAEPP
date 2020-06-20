import { Component, OnInit, Input } from '@angular/core';
import { LookupService } from '../services/lookup.service';
@Component({
  selector: 'app-hospital-indemnity',
  templateUrl: './hospital-indemnity.component.html',
  styleUrls: ['./hospital-indemnity.component.css']
})
export class HospitalIndemnityComponent implements OnInit {
  @Input() lookupValue: any;
  @Input() dateValue: any;


  situsValue:string;
  public isLoading = false;
  lookUpDataSitusStates: any = [];
  name = false;
  dob = false;
  gender = false;
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

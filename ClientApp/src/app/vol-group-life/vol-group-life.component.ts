import { Component, OnInit, Input } from '@angular/core';
import { LookupService } from '../services/lookup.service';
@Component({
  selector: 'app-vol-group-life',
  templateUrl: './vol-group-life.component.html',
  styleUrls: ['./vol-group-life.component.css']
})
export class VolGroupLifeComponent implements OnInit {
  lookUpDataSitusStates: any = [];
  public lookupSitusStateValue = "";
  public isLoading = false;
  @Input() lookupSitusState: any;
  public minDate = new Date().toISOString().slice(0,10);
  constructor(private lookupService: LookupService) { }

  ngOnInit() {
    this.lookupService.getLookupsData()
    .subscribe((data: any) => {
      this.isLoading = true;
      this.lookUpDataSitusStates = Object.values(data.situsState);
      
    });
  }
  getLookupValueSitusState(value: any){
    this.lookupSitusStateValue = value;
  }

}

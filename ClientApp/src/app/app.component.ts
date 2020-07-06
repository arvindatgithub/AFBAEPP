import { Component } from '@angular/core';
import { LookupService } from './services/lookup.service';
import { Subscription } from 'rxjs';
import { EppAcion } from './services/model/epp-acion';
import { EppCreateGrpSetupService } from './services/epp-create-grp-setup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  isLoading = 'false';
  lookUpDataSitusStates: any = [];
  public datasource: any;
  //private subscriptionResults = new Subscription();



  constructor(private lookupService: LookupService, private eppcreategroupservice: EppCreateGrpSetupService) {

    this.lookupService.getLookupsData().subscribe((data: any) => {
      {
        this.lookUpDataSitusStates = (data.situsState);
        let key = 'lookUpSitusApiData';
        if (localStorage.getItem("lookUpSitusApiData") !== null) {
          localStorage.clear();
        }
        localStorage.setItem(key, JSON.stringify(this.lookUpDataSitusStates));
      }
    });



    this.eppcreategroupservice.getGroupNbrEppData('').subscribe(data => {

      let groupsData = data;
      let key = 'GroupNumApiData';
      if (localStorage.getItem("GroupNumApiData") !== null) {
        localStorage.clear();
      }
      localStorage.setItem(key, JSON.stringify(groupsData));

    });
  }
}

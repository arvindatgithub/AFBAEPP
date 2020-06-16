import { Component } from '@angular/core';
import { LookupService } from './services/lookup.service';
import { Subscription } from 'rxjs';
import { EppAcion } from './services/model/epp-acion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  public datasource: EppAcion[];
  private subscriptionResults = new Subscription();

  constructor(private lookupService: LookupService) {
   this.lookupService.getEppAction().subscribe((data) => {
     this.datasource = data;
     console.log(data);
        });


  }
}

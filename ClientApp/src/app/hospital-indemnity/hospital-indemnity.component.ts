import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hospital-indemnity',
  templateUrl: './hospital-indemnity.component.html',
  styleUrls: ['./hospital-indemnity.component.css']
})
export class HospitalIndemnityComponent implements OnInit {
  public minDate = new Date().toISOString().slice(0,10);

  @Input() lookupSitusState: any;

  constructor() { }

  ngOnInit() {
  }

}

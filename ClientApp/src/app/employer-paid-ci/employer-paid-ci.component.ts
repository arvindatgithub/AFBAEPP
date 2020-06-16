import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-employer-paid-ci',
  templateUrl: './employer-paid-ci.component.html',
  styleUrls: ['./employer-paid-ci.component.css']
})
export class EmployerPaidCIComponent implements OnInit {

  @Input() lookupSitusState:string;
  public minDate = new Date().toISOString().slice(0,10);

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-voluntary-ci',
  templateUrl: './voluntary-ci.component.html',
  styleUrls: ['./voluntary-ci.component.css']
})
export class VoluntaryCIComponent implements OnInit {
  @Input() lookupSitusState: any;
  public minDate = new Date().toISOString().slice(0,10);
  constructor() { }

  ngOnInit() {
  }

}

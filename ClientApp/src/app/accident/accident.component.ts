import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.css']
})
export class AccidentComponent implements OnInit {
  @Input() lookupSitusState: any;
  public minDate = new Date().toISOString().slice(0,10);
  checked: any
  constructor() { }

  ngOnInit() {
  }

}

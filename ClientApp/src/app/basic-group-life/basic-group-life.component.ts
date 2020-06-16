import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-basic-group-life',
  templateUrl: './basic-group-life.component.html',
  styleUrls: ['./basic-group-life.component.css']
})
export class BasicGroupLifeComponent implements OnInit {

  @Input() lookupSitusState: any;
  public minDate = new Date().toISOString().slice(0,10);
  constructor() { }

  ngOnInit() {
  }

}

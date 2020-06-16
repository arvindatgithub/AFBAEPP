import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vol-group-life',
  templateUrl: './vol-group-life.component.html',
  styleUrls: ['./vol-group-life.component.css']
})
export class VolGroupLifeComponent implements OnInit {
  
  @Input() lookupSitusState: any;
  public minDate = new Date().toISOString().slice(0,10);
  constructor() { }

  ngOnInit() {
  }

}

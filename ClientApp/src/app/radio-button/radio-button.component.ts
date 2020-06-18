import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent implements OnInit {
  @Input()
  lookupValue: any;
  constructor() { }

  ngOnInit() {
  }

}

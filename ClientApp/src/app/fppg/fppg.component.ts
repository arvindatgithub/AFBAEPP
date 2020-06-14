import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fppg',
  templateUrl: './fppg.component.html',
  styleUrls: ['./fppg.component.css']
})
export class FPPGComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

}

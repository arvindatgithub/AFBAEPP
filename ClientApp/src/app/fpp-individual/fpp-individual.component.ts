import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fpp-individual',
  templateUrl: './fpp-individual.component.html',
  styleUrls: ['./fpp-individual.component.css']
})
export class FPPIndividualComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

}

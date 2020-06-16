import { Component, OnInit, Input } from '@angular/core';
import { EppAcion } from '../services/model/epp-acion';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() public data:EppAcion;

  constructor() { }

  ngOnInit() {
  }

}

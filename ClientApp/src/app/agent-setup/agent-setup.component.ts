import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { EppCreateGrpSetupService } from '../services/epp-create-grp-setup.service';


@Component({
  selector: 'app-agent-setup',
  templateUrl: './agent-setup.component.html',
  styleUrls: ['./agent-setup.component.css']
})
export class AgentSetupComponent implements OnInit, OnChanges {
  text: string = "";
  textValue:any 
  constructor(private eppservice:EppCreateGrpSetupService) { }
  ngOnChanges(){
    
  }

  ngOnInit() {
    this.textValue = this.text
  }

}

import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { EppCreateGrpSetupService } from '../services/epp-create-grp-setup.service';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-agent-setup',
  templateUrl: './agent-setup.component.html',
  styleUrls: ['./agent-setup.component.css']
})
export class AgentSetupComponent implements OnInit, OnChanges {
  text: string = "";
  agentformgrp:FormGroup;

  constructor(private eppservice:EppCreateGrpSetupService, private fb: FormBuilder) { }
  ngOnChanges(){
    
  }

  ngOnInit() {
    
  }

}

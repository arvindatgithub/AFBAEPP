import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormControl, FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { EppCreateGrpSetupService } from '../services/epp-create-grp-setup.service';
@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent implements OnInit {
  @Input()
  lookupValue: any;
  
  radiobuttonFormGrp: FormGroup;
  
    
  constructor(private fb:FormBuilder,private eppsercive: EppCreateGrpSetupService) { 
    
  }

  ngOnInit() {
    // this.radiobuttonFormGrp = this.fb.group({
    //   FCRadioButton: [this.favoriteSeason ,Validators.required],
    // });
  }
  

}

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
<<<<<<< HEAD
  radioButtons:string[]= ['Always Override','Update if Blank', 'Validate']
  seasons = 
    {
      effectiveDate:{
        id: "effective_Date",
        value: this.radioButtons
      },
      // situs_state:{
      //   id:"situs_state",
      //   value:this.radioButtons
      // }
    }
=======
  
>>>>>>> harsh-ClientApp
    
  constructor(private fb:FormBuilder,private eppsercive: EppCreateGrpSetupService) { 
    
  }

  ngOnInit() {
    // this.radiobuttonFormGrp = this.fb.group({
    //   FCRadioButton: [this.favoriteSeason ,Validators.required],
    // });
  }
  

}

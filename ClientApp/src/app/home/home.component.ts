import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router){}

  Groupsetup() {
    this.router.navigate(['/group-search']);
  }

  ManageBulk() {
    this.router.navigate(['/custom-bulk-update']);
  }

  ManageUserAcess() {
    this.router.navigate(['/user-access']);
  }

  ManageErrorMsg() {
    this.router.navigate(['/manage-error']);
  }

  ManageTemplate() {
    this.router.navigate(['/custom-bulk-template']);
  }

}

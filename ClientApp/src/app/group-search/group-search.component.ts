import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-group-search',
  templateUrl: './group-search.component.html',
  styleUrls: ['./group-search.component.css']
})


export class GroupSearchComponent implements OnInit {
  groupSearchSection: boolean = true;
  groupSetUpNavigate: boolean;
  groupSearchResults: boolean = false;
  disabledFlag: boolean = true;
  selectedGrps: any;
  searchBoxVal: any;
  existingGrp: any;

  constructor(private router: Router) { }

 
  public groups = [
    {
      id: 10001,
      name: 'Group one',
    },
    {
      id: 10002,
      name: 'Group Two',
    },
    {
      id: 10003,
      name: 'Group Three',
    },
    {
      id: 10004,
      name: 'Group Four',
    },
    {
      id: 10005,
      name: 'Group Five',
    },
  ];



  ngOnInit() {
  }

  onSearchChange(searchValue: string): void {
    if(searchValue !== '' && searchValue !== null && searchValue !== undefined){
      this.disabledFlag = false;
    } else {
      this.disabledFlag = true;
    }
    console.log(searchValue);
    console.log(this.searchBoxVal);
  }

  GroupSearch() {
    this.groups.forEach(grp => {
      if(grp.id == this.searchBoxVal || grp.name == this.searchBoxVal){
        this.existingGrp = grp;
      }
    });
    this.groupSearchSection = false; 
    this.groupSearchResults = true;
  }

  goToSetup() {
    this.router.navigate(['/group-setup']);
  }

  goToSearch(){
    this.groupSearchSection = true;
    this.groupSearchResults = false;
  }
  

 
}

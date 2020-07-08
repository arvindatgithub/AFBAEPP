import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GroupsearchService } from '../services/groupsearch.service';

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
  groups: any;

  constructor(private router: Router, private groupSearchService: GroupsearchService ) {
    
  }


  ngOnInit() {
    this.groupSearchService.getGroupsData().subscribe((data) => {
      this.groups = data;
      console.log(data);
    });
  }

  onSearchChange(searchValue: string): void {
    if (searchValue !== '' && searchValue !== null && searchValue !== undefined) {
      this.disabledFlag = false;
    } else {
      this.disabledFlag = true;
    }
    console.log(searchValue);
    console.log(this.searchBoxVal);
  }

  GroupSearch() {
    if(this.groups !== null && this.groups !== undefined){
      this.groups.forEach(grp => {
        if (grp.grpNbr == this.searchBoxVal || grp.grpNm == this.searchBoxVal) {
          this.existingGrp = grp;
        }
      });
      this.groupSearchSection = false;
      this.groupSearchResults = true;
    }
    
  }

  goToSetup(grpNbr) {
    this.groupSearchService.setFromSearchFlag(true);
    this.groupSearchService.setEditGrpNbr(grpNbr);
    this.router.navigate(['/group-setup',grpNbr]);

  }

  goToSearch() {
    this.groupSearchSection = true;
    this.groupSearchResults = false;
  }

  navigateGrpScreen(){
    let key = 'AddGroup';
    if (localStorage.getItem("AddGroup") !== null) {
      localStorage.clear();
    }
    localStorage.setItem(key, '1');
    this.router.navigate(['/group-setup']);
   
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.groups.filter = filterValue.trim().toLowerCase();
  //   console.log('filtered' +this.groups);
  // }

}

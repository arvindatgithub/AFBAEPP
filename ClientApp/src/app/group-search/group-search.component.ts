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
    this.groups.forEach(grp => {
      if (grp.grpNbr == this.searchBoxVal || grp.grpNm == this.searchBoxVal) {
        this.existingGrp = grp;
      }
    });
    this.groupSearchSection = false;
    this.groupSearchResults = true;
  }

  goToSetup(grpNbr) {
    console.log('Existing Group Number-- go to set up screen '+ grpNbr);
    this.groupSearchService.existingGrpNbrSelected(grpNbr);
    this.router.navigate(['/group-setup']);

    // this.groupSearchService.getGroupNbrEppData(grpNbr).subscribe((data) => {
    //   console.log('Group number epp data ' + JSON.stringify(data));
      
    // });
  }

  goToSearch() {
    this.groupSearchSection = true;
    this.groupSearchResults = false;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.groups.filter = filterValue.trim().toLowerCase();
  //   console.log('filtered' +this.groups);
  // }

}

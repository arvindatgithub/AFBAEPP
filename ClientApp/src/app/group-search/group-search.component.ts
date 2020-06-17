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

  constructor(private router: Router, private groupSearchService: GroupsearchService) {
    this.groupSearchService.getGroupsData().subscribe((data) => {
      this.groups = data;
      console.log(data);
    });
  }


  ngOnInit() {
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

  goToSetup() {
    this.router.navigate(['/group-setup']);
  }

  goToSearch() {
    this.groupSearchSection = true;
    this.groupSearchResults = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.groups.filter = filterValue.trim().toLowerCase();
    console.log('filtered' +this.groups);
  }

}

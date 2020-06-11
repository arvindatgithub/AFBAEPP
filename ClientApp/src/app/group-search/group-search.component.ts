import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  edit: any;
  clone: any;
  // clone:any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 10001, name: 'Group one', edit: 'Edit Group', clone:' Clone Group'},
  {position: 10002, name: 'Group Two',  edit: 'Edit Group', clone:' Clone Group'},
  {position: 10003, name: 'Group Three', edit: 'Edit Group', clone:' Clone Group'},
  {position: 10004, name: 'Group Four', edit: 'Edit Group', clone:' Clone Group'},
  {position: 10005, name: 'Group Five', edit: 'Edit Group', clone:' Clone Group'},

];


@Component({
  selector: 'app-group-search',
  templateUrl: './group-search.component.html',
  styleUrls: ['./group-search.component.css']
})


export class GroupSearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['position', 'name' ,'edit','clone'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  GroupSetup() {
    this.router.navigate(['/group-setup']);
  }
}

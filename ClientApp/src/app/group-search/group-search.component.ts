import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-group-search',
  templateUrl: './group-search.component.html',
  styleUrls: ['./group-search.component.css']
})


export class GroupSearchComponent implements OnInit {
  groupSetUpNavigate: boolean;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  GroupSearch() {
      this.router.navigate(['/group-setup']);
    
  }

  
  keyword = 'name';
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

    selectEvent(item) {
       console.log('selected item'+ JSON.stringify(item));
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log('search item'+ search);
  }

  onFocused(e) {
    // do something
    console.log('focused val'+ e);
  }

}

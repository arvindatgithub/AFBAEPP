import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupsearchService {

  constructor(private http: HttpClient) { }

  getGroupsData() {
    const GroupsDataUrl = environment.apiurl + 'GroupSetup/GetGroupsData';
    return this.http.get(GroupsDataUrl);
  }
  
}

import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomeppattributeService {

  constructor(private http: HttpClient) {}
  
  getAvailableFields() {
    const GroupsDataUrl = environment.apiurl + 'Custom/EppGetAvailableFields';
    return this.http.get(GroupsDataUrl);
  
  }

  getSelectedFields() {
    const GroupsDataUrl = environment.apiurl + 'Custom/EppGetSelectedFields';
    return this.http.get(GroupsDataUrl);
  
  }

}
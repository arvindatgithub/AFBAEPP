import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomeppattributeService {

  constructor(private http: HttpClient) {}
  
  getAttributes() {
    const GroupsDataUrl = environment.apiurl + 'Custom/EppAttributes';
    return this.http.get(GroupsDataUrl);
  
  }
}
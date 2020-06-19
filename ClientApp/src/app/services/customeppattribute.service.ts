import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomeppattributeService {

  constructor(private http: HttpClient) {}
  
  getEppProducts() {
    const GroupsDataUrl = environment.apiurl + 'Lookup/EppProducts';
    return this.http.get(GroupsDataUrl);
  }

  getProductFields(product) {
    const GroupsDataUrl = environment.apiurl + 'Custom/product/' + product;
    return this.http.get(GroupsDataUrl);
  
  }

}
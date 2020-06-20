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

  getProductFieldsByGroup(grpNbr,productNm) {
    const GroupsDataUrl = environment.apiurl + 'Custom/grpNbr/' + grpNbr + '/productNm/' + productNm;
    return this.http.get(GroupsDataUrl);
  }

  addProdAttr(requestObj){
    const GroupsDataUrl = environment.apiurl + 'Custom/EppAddPrdctAttrbt';
    return this.http.post(GroupsDataUrl,requestObj);
  }
  
  editProdAttr(requestObj){
    const GroupsDataUrl = environment.apiurl + 'Custom/EppEditPrdctAttrbt';
    return this.http.put(GroupsDataUrl,requestObj);
  }

}
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


  getProductFieldsByGroup(grpNbr,productId) {
    const GroupsDataUrl = environment.apiurl + 'Custom/grpNbr/' + grpNbr + '/productId/' + productId;
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

  getQuestionAttr() {
    const GroupsDataUrl = environment.apiurl + 'Custom/GetQuetsionAttr';
    return this.http.get(GroupsDataUrl);
  }

  getGroupQuestionAttr(grpNbr) {
    const GroupsDataUrl = environment.apiurl + 'Custom/GetGroupQuestionAtrr/groupNbr/' + grpNbr;
    return this.http.get(GroupsDataUrl);
  }

  getCloneCustomExistingGroup(grpNbr,productId){
    const GroupsDataUrl = environment.apiurl + 'Custom/Tobecloned/'+ grpNbr +'/productId/' + productId;
    return this.http.get(GroupsDataUrl);
  }


}
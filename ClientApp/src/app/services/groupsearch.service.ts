import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsearchService {

  constructor(private http: HttpClient) { }
  private groupNumber = new BehaviorSubject<string>('');
  castGroupNumber = this.groupNumber.asObservable();
  editGrpNbr :any;
  fromSearchFlag = false;

  getGroupsData() {
    const GroupsDataUrl = environment.apiurl + 'GroupSetup/GetGroupsData';
    return this.http.get(GroupsDataUrl);
  }

  

  existingGrpNbrSelected(value){
    this.groupNumber.next(value);
 }
  
 setEditGrpNbr(Nbr){
   this.editGrpNbr = Nbr;
 }
 getEditGrpNbr(){
   return this.editGrpNbr;
 }

 setFromSearchFlag(flag) {
   this.fromSearchFlag = flag;
 }
 getFromSearchFlag() {
  return this.fromSearchFlag;
}

}

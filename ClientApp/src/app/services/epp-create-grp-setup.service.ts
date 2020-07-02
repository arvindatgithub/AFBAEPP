import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EppCreateGrpSetupService {
  myEppData: Observable<any>;
  private eppData = new Subject<any>();  

  constructor(private http: HttpClient) { 
    this.myEppData = this.eppData.asObservable();
  }
  private addEditClone = new BehaviorSubject<string>('');
  castAddEditClone = this.addEditClone.asObservable();

  getGroupNbrEppData(grpNbr){
    const eppCreateURL = environment.apiurl + 'GroupSetup/grpNbr/' + grpNbr;
    return this.http.get(eppCreateURL);
  }

  PosteppCreate(postBody){
    const eppCreateURL = environment.apiurl + 'GroupSetup/EppCreateGrpSetup';
    return this.http.post(eppCreateURL,postBody);
  }
  getEppData(value:any){
     this.eppData.next(value);
  }
 
  postEppEdit(postBody){
    const eppEditURL = environment.apiurl + 'GroupSetup/EditEppGrpSetup';
    return this.http.put(eppEditURL,postBody);
  }

  setUserStatus(value){
    this.addEditClone.next(value);
 }
}


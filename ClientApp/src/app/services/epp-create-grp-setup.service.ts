import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EppCreateGrpSetupService {
  myEppData: Observable<any>;
  private eppData = new Subject<any>();  

  constructor(private http: HttpClient) { 
    this.myEppData = this.eppData.asObservable();
  }

  PosteppCreate(postBody){
    const eppCreateURL = environment.apiurl + 'GroupSetup/EppCreateGrpSetup';
    return this.http.post(eppCreateURL,postBody);
  }
  getEppData(value:any){
     this.eppData.next(value);
  }
  // sendEppDataToGroupSearch(){
  //   return this.eppData;
  // }
}


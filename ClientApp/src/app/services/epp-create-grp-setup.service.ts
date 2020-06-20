import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EppCreateGrpSetupService {

  constructor(private http: HttpClient) { }

  PosteppCreate(postBody){
    const eppCreateURL = "https://afbaepp.herokuapp.com/GroupSetup/EppCreateGrpSetup";
    return this.http.post(postBody, eppCreateURL);
  }
  



}


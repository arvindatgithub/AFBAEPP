import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { EppAcion } from './model/epp-acion';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
    constructor(private http: HttpClient ) {
   
  }

  getEppAction(): Observable<EppAcion[]> {
    const apiUrl = environment.apiurl + 'lookup/eppaction';
    return this.http.get<EppAcion[]>(apiUrl)
    .pipe(
      map(res => {
        if (res instanceof Array) {        
          return res.map(x => {           
            const eppActions: EppAcion = {
              actionId: x.actionId,
              name: x.name
            };
            return eppActions;
          });
        }
      }
      )); 
  }
  //LookupDictionaryViewModel LookupsData

  getLookupsData() {
    const LookupDataUrl = environment.apiurl + 'lookup/LookupsData';
    return this.http.get(LookupDataUrl);
  }

  getLookupsData_1(): Observable<any[]> {
    const apiUrl = environment.apiurl + 'lookup/LookupsData';
    return this.http.get<EppAcion[]>(apiUrl)
      .pipe(
        map(res => {
          if (res instanceof Array) {
            return res.map(x => {
              const eppActions: any = {
                
              };
              return eppActions;
            });
          }
        }
        )); 

  }
}

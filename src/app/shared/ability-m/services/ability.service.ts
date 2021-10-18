import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@pokemon/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AbilityService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getAbilities(): Observable<any>{
    return this.http.get<any>(`${this.baseURL}ability?limit=-1`).pipe(
      map(res => (res ||[])),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getAbility(name: string): Observable<any>{
    return this.http.get<any>(`${this.baseURL}ability/${name}/`).pipe(
      map(res => (res || {})),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}

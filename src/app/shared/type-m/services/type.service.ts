import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CoreConfigService } from '../../../core/services/core-config.service';


@Injectable({
  providedIn: 'root'
})
export class TypeService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getTypes(): Observable<any>{
    return this.http.get<any>(`${this.baseURL}type?limit=-1`).pipe(
      map(res => (res || [])),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}

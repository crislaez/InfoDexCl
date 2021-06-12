import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of, EMPTY } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
// import { Chapters } from '../models';
import { CoreConfigService, EndpointType } from '../../../core/services/core-config.service';
// import { getChapters } from '../reducers/biblereducer';


@Injectable({
  providedIn: 'root'
})
export class TypeService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getTypes(): Observable<any>{
    return this.http.get<any>(`${this.baseURL}type?limit=-1`).pipe(
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}

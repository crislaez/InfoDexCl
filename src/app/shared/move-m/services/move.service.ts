import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CoreConfigService } from '../../../core/services/core-config.service';

@Injectable({
  providedIn: 'root'
})
export class MoveService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getmoves(): Observable<any>{
    return this.http.get<any>(`${this.baseURL}move?limit=-1`).pipe(
      map(res => (res || [])),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getMove(name: string): Observable<any>{
    return this.http.get<any>(`${this.baseURL}move/${name}/`).pipe(
      map(res => (res || {})),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

}

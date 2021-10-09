import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CoreConfigService } from '../../../core/services/core-config.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;

  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }

  getPokemons(): Observable<any>{
    return this.http.get<any>(`${this.baseURL}pokemon?limit=-1`).pipe(
      map(response => (response || [])),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getPokemon(name: string): Observable<any>{
    return this.http.get<any>(`${this.baseURL}pokemon/${name}`).pipe(
      map(res => (res || {})),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getMove(name: string): Observable<any>{
    return this.http.get<any>(`${this.baseURL}move/${name}/`).pipe(
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getAbility(name: string): Observable<any>{
    return this.http.get<any>(`${this.baseURL}ability/${name}/`).pipe(
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getType(name: string): Observable<any>{
    return this.http.get<any>(`${this.baseURL}type/${name}/`).pipe(
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getEncounter(url: string): Observable<any>{
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        return throwError(error)
      })
    )
  }
  // https://pokeapi.co/api/v2/pokemon/10034/encounters

  getPokemonSpecie(url: string): Observable<any>{
    let urlSplited: any = url.split('');
    urlSplited = urlSplited.slice(0,-1).join('')

    return this.http.get<any>(urlSplited).pipe(
      switchMap(( {evolution_chain: {url}, flavor_text_entries, varieties}) =>
        this.http.get<any>(url).pipe(
          map((evolutions) => ({evolutions, flavor_text_entries, varieties} ))
        )
      ),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  // https://pokeapi.co/api/v2/pokemon-form/74/
  // getEvolutionChain(name: string): Observable<any>{
  //   return this.http.get<any>(`${this.baseURL}evolution-chain/${name}/`).pipe(
  //     catchError((error) => {
  //       return throwError(error)
  //     })
  //   )
  // }


}

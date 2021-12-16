import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as NotificationActions from '@pokemon/shared/notification/actions/notification.actions';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EntityStatus } from '../../utils/utils/functions';
import * as PokemonActions from '../actions/pokemon.actions';
import { PokemonService } from '../services/pokemon.service';


@Injectable()
export class PokemonEffects {

  loadPokemons$ = createEffect( () =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemons),
      switchMap( () =>
        this._pokemon.getPokemons().pipe(
          map( ({results}): any => PokemonActions.savePokemons({ pokemons: results, error:undefined, status: EntityStatus.Loaded})),
          catchError( (error) => {
            return of(
              PokemonActions.savePokemons({ pokemons: [], error, status: EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_POKEMON'})
            )
          }),
        )
      )
    )
  );

  loadPokemon$ = createEffect( () =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemon),
      switchMap( ({pokemonName}) =>
        this._pokemon.getPokemon(pokemonName).pipe(
          switchMap((pokemon) =>
            this._pokemon.getPokemonSpecie(pokemon?.species?.url).pipe(
              switchMap(({evolutions, varieties, flavor_text_entries}) =>
                this._pokemon.getEncounter(pokemon?.location_area_encounters).pipe(
                  map((encounters) => PokemonActions.savePokemon({pokemon:{...pokemon, evolutions, varieties, encounters, flavor_text_entries: flavor_text_entries?.find(item => item?.language?.name === 'en')?.flavor_text}, error:undefined, status: EntityStatus.Loaded})),
                  catchError((error) => this._PokemonCatchError(error))
                )
              ),
              catchError((error) => this._PokemonCatchError(error))
            )
          ),
          catchError((error) => this._PokemonCatchError(error))
        )
      )
    )
  );

  loadPokemonInit$ = createEffect(() =>
    of(PokemonActions.loadPokemons())
  );


  private _PokemonCatchError(error): Observable<any>{
    return of(
      PokemonActions.savePokemon({ pokemon: {}, error, status: EntityStatus.Error }),
      NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_POKEMON'})
    )
  }


  constructor(
    private actions$: Actions,
    private _pokemon: PokemonService,
    public toastController: ToastController,
  ){}


}

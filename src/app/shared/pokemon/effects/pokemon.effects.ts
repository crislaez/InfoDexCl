import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, filter, tap, withLatestFrom } from 'rxjs/operators';
import { PokemonActions } from '../actions';
import { PokemonService } from '../services/pokemon.service';
import { of } from 'rxjs';


@Injectable()
export class PokemonEffects {

  loadPokemons$ = createEffect( () =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemons),
      switchMap( () =>
        this._pokemon.getPokemons().pipe(
          map( ({results}): any => PokemonActions.savePokemons({ pokemons: results})),
          catchError( () => [PokemonActions.savePokemons({ pokemons: []})]),
        )
      )
    )
  );

  loadPokemonInit$ = createEffect(() =>
    of(PokemonActions.loadPokemons())
  );

  constructor(
    private actions$: Actions,
    private _pokemon: PokemonService,
    private location: Location
  ){}
}

import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { EntityStatus } from '../../shared/utils/utils';
import { PokemonActions } from '../actions';
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
              PokemonActions.loadPokemonsFailure({message: 'Error loading pokemons'})
            )
          }),
        )
      )
    )
  );

  loadPokemonsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemonsFailure),
      tap(({message}) => this.presentToast(message, 'danger')),
    ), { dispatch: false }
  );

  loadPokemonInit$ = createEffect(() =>
    of(PokemonActions.loadPokemons())
  );


  constructor(
    private actions$: Actions,
    private _pokemon: PokemonService,
    public toastController: ToastController,
  ){}


  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 1000
    });
    toast.present();
  }

}

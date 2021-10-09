import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
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
              PokemonActions.loadPokemonsFailure({message: 'ERRORS.ERROR_LOAD_POKEMONS'})
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

  loadPokemonsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemonsFailure, PokemonActions.loadPokemonFailure),
      tap(({message}) => this.presentToast(this.translate.instant(message), 'danger')),
    ), { dispatch: false }
  );

  loadPokemonInit$ = createEffect(() =>
    of(PokemonActions.loadPokemons())
  );


  private _PokemonCatchError(error): Observable<any>{
    return of(
      PokemonActions.savePokemon({ pokemon: {}, error, status: EntityStatus.Error }),
      PokemonActions.loadPokemonFailure({message: 'ERRORS.ERROR_LOAD_POKEMON'})
    )
  }

  constructor(
    private actions$: Actions,
    private _pokemon: PokemonService,
    private translate: TranslateService,
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

import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { EntityStatus } from '../../shared/utils/utils';
import { AbilityActions } from '../actions';
import { AbilityService } from '../services/ability.service';

@Injectable()
export class AbilityEffects {

  LoadAbilities$ = createEffect( () =>
    this.actions$.pipe(
      ofType(AbilityActions.LoadAbilities),
      switchMap( () =>
        this._ability.getAbilities().pipe(
          map( ({results}): any => AbilityActions.saveAbilities({ abilities: results, error:undefined, status: EntityStatus.Loaded})),
          catchError( (error) => {
            return of(
              AbilityActions.saveAbilities({ abilities: [], error, status: EntityStatus.Error }),
              AbilityActions.LoadAbilitiesFailure({message: 'Error loading Abilities'})
            )
          }),
        )
      )
    )
  );

  loadPokemonsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AbilityActions.LoadAbilitiesFailure),
      tap(({message}) => this.presentToast(message, 'danger')),
    ), { dispatch: false }
  );

  loadAbilityInit$ = createEffect(() =>
    of(AbilityActions.LoadAbilities())
  );

  constructor(
    private actions$: Actions,
    private _ability: AbilityService,
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

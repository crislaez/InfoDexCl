import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { EntityStatus } from '../../shared/utils/utils';
import { AbilityActions } from '../actions';
import { AbilityService } from '../services/ability.service';

@Injectable()
export class AbilityEffects {

  loadAbilities$ = createEffect( () =>
    this.actions$.pipe(
      ofType(AbilityActions.loadAbilities),
      switchMap( () =>
        this._ability.getAbilities().pipe(
          map( ({results}): any => AbilityActions.saveAbilities({ abilities: results, error:undefined, status: EntityStatus.Loaded})),
          catchError( (error) => {
            return of(
              AbilityActions.saveAbilities({ abilities: [], error, status: EntityStatus.Error }),
              AbilityActions.loadAbilitiesFailure({message: 'ERRORS.ERROR_LOAD_ABILIITIES'})
            )
          }),
        )
      )
    )
  );

  loadAbility$ = createEffect( () =>
    this.actions$.pipe(
      ofType(AbilityActions.loadAbility),
      switchMap( ({abilityyName}) =>
        this._ability.getAbility(abilityyName).pipe(
          map( (results): any => AbilityActions.saveAbility({ ability: results, error:undefined, status: EntityStatus.Loaded})),
          catchError( (error) => {
            return of(
              AbilityActions.saveAbility({ ability: {}, error, status: EntityStatus.Error }),
              AbilityActions.loadAbilityFailure({message: 'ERRORS.ERROR_LOAD_ABILITY'})
            )
          })
        )
      )
    )
  );

  loadPokemonsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AbilityActions.loadAbilitiesFailure,  AbilityActions.loadAbilityFailure),
      tap(({message}) => this.presentToast(this.translate.instant(message), 'danger')),
    ), { dispatch: false }
  );

  loadAbilityInit$ = createEffect(() =>
    of(AbilityActions.loadAbilities())
  );

  constructor(
    private actions$: Actions,
    private _ability: AbilityService,
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

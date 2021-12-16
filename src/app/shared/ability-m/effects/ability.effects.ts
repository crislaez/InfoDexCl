import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as NotificationActions from '@pokemon/shared/notification/actions/notification.actions';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EntityStatus } from '../../utils/utils/functions';
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
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_ABILIITIES'})
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
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_ABILITY'})
            )
          })
        )
      )
    )
  );

  loadAbilityInit$ = createEffect(() =>
    of(AbilityActions.loadAbilities())
  );

  constructor(
    private actions$: Actions,
    private _ability: AbilityService,
    public toastController: ToastController,
  ){}


}

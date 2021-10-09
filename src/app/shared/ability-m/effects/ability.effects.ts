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

  LoadAbilities$ = createEffect( () =>
    this.actions$.pipe(
      ofType(AbilityActions.LoadAbilities),
      switchMap( () =>
        this._ability.getAbilities().pipe(
          map( ({results}): any => AbilityActions.SaveAbilities({ abilities: results, error:undefined, status: EntityStatus.Loaded})),
          catchError( (error) => {
            return of(
              AbilityActions.SaveAbilities({ abilities: [], error, status: EntityStatus.Error }),
              AbilityActions.LoadAbilitiesFailure({message: 'ERRORS.ERROR_LOAD_ABILIITIES'})
            )
          }),
        )
      )
    )
  );

  LoadAbility$ = createEffect( () =>
    this.actions$.pipe(
      ofType(AbilityActions.LoadAbility),
      switchMap( ({abilityyName}) =>
        this._ability.getAbility(abilityyName).pipe(
          map( (results): any => AbilityActions.SaveAbility({ ability: results, error:undefined, status: EntityStatus.Loaded})),
          catchError( (error) => {
            return of(
              AbilityActions.SaveAbility({ ability: null, error, status: EntityStatus.Error }),
              AbilityActions.LoadAbilityFailure({message: 'ERRORS.ERROR_LOAD_ABILITY'})
            )
          })
        )
      )
    )
  );

  loadPokemonsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AbilityActions.LoadAbilitiesFailure,  AbilityActions.LoadAbilityFailure),
      tap(({message}) => this.presentToast(this.translate.instant(message), 'danger')),
    ), { dispatch: false }
  );

  loadAbilityInit$ = createEffect(() =>
    of(AbilityActions.LoadAbilities())
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

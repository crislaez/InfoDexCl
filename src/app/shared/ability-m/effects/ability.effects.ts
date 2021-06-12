import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, filter, tap, withLatestFrom } from 'rxjs/operators';
import { AbilityActions } from '../actions';
import { AbilityService } from '../services/ability.service';
import { of } from 'rxjs';


@Injectable()
export class AbilityEffects {

  LoadAbilities$ = createEffect( () =>
    this.actions$.pipe(
      ofType(AbilityActions.LoadAbilities),
      switchMap( () =>
        this._ability.getAbilities().pipe(
          map( ({results}): any => AbilityActions.saveAbilities({ abilities: results})),
          catchError( () => [AbilityActions.saveAbilities({ abilities: []})]),
        )
      )
    )
  );

  loadAbilityInit$ = createEffect(() =>
    of(AbilityActions.LoadAbilities())
  );

  constructor(
    private actions$: Actions,
    private _ability: AbilityService,
    private location: Location
  ){}
}

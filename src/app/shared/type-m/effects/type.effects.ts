import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as NotificationActions from '@pokemon/shared/notification/actions/notification.actions';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EntityStatus } from '../../utils/utils/functions';
import * as TypeActions from '../actions/type.actions';
import { TypeService } from '../services/type.service';


@Injectable()
export class TypeEffects {

  loadTypes$ = createEffect( () =>
    this.actions$.pipe(
      ofType(TypeActions.loadTypes),
      switchMap( () =>
        this._type.getTypes().pipe(
          map( ({results}): any => TypeActions.saveTypes({ types: results, error:undefined, status: EntityStatus.Loaded})),
          catchError( (error) => {
            return of(
              TypeActions.saveTypes({ types: [], error, status: EntityStatus.Error}),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_TYPES'})
            )
          }),
        )
      )
    )
  );

  loadType$ = createEffect( () =>
    this.actions$.pipe(
      ofType(TypeActions.loadType),
      switchMap( ({typeName}) =>
        this._type.getType(typeName).pipe(
          map( (results) => TypeActions.saveType({ pokemonType: results, error:undefined, status: EntityStatus.Loaded})),
          catchError( (error) => {
            return of(
              TypeActions.saveType({ pokemonType: {}, error, status: EntityStatus.Error}),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_TYPE'})
            )
          }),
        )
      )
    )
  );

  loadTypeInit$ = createEffect(() =>
    of(TypeActions.loadTypes())
  );


  constructor(
    private actions$: Actions,
    private _type: TypeService,
    public toastController: ToastController,
  ){}



}

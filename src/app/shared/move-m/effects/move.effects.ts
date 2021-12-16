import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as NotificationActions from '@pokemon/shared/notification/actions/notification.actions';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EntityStatus } from '../../utils/utils/functions';
import * as MoveActions from '../actions/move.actions';
import { MoveService } from '../services/move.service';


@Injectable()
export class MoveEffects {

  loadMoves$ = createEffect( () =>
    this.actions$.pipe(
      ofType(MoveActions.loadMoves),
      switchMap( () =>
        this._move.getmoves().pipe(
          map( ({results}): any => MoveActions.saveMoves({ moves: results, error:undefined, status: EntityStatus.Loaded})),
          catchError( (error) => {
            return of(
              MoveActions.saveMoves({ moves: [], error, status: EntityStatus.Error}),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_MOVES'})
            )
          }),
        )
      )
    )
  );

  loadMove$ = createEffect( () =>
    this.actions$.pipe(
      ofType(MoveActions.loadMove),
      switchMap(({moveName}) =>
        this._move.getMove(moveName).pipe(
          map( (results) => MoveActions.saveMove({ move: results, error:undefined, status: EntityStatus.Loaded})),
          catchError( (error) => {
            return of(
              MoveActions.saveMove({ move:{}, error, status: EntityStatus.Error}),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_MOVE'})
            )
          }),
        )
      )
    )
  );

  loadMoveInit$ = createEffect(() =>
    of(MoveActions.loadMoves())
  );

  constructor(
    private actions$: Actions,
    private _move: MoveService,
    public toastController: ToastController,
  ){}




}

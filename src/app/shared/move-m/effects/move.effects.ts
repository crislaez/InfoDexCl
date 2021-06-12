import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, filter, tap, withLatestFrom } from 'rxjs/operators';
import { MoveActions } from '../actions';
import { MoveService } from '../services/move.service';
import { of } from 'rxjs';


@Injectable()
export class MoveEffects {

  loadMoves$ = createEffect( () =>
    this.actions$.pipe(
      ofType(MoveActions.loadMoves),
      switchMap( () =>
        this._move.getmoves().pipe(
          map( ({results}): any => MoveActions.saveMoves({ moves: results})),
          catchError( () => [MoveActions.saveMoves({ moves: []})]),
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
    private location: Location
  ){}
}

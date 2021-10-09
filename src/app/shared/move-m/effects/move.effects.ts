import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { EntityStatus } from '../../shared/utils/utils';
import { MoveActions } from '../actions';
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
              MoveActions.loadMovesFailure({message: 'ERRORS.ERROR_LOAD_MOVES'})
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
              MoveActions.loadMoveFailure({message: 'ERRORS.ERROR_LOAD_MOVE'})
            )
          }),
        )
      )
    )
  );

  loadPokemonsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoveActions.loadMovesFailure, MoveActions.loadMoveFailure),
      tap(({message}) => this.presentToast(this.translate.instant(message), 'danger')),
    ), { dispatch: false }
  );


  loadMoveInit$ = createEffect(() =>
    of(MoveActions.loadMoves())
  );

  constructor(
    private actions$: Actions,
    private _move: MoveService,
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

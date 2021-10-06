import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { EntityStatus } from '../../shared/utils/utils';
import { TypeActions } from '../actions';
import { TypeService } from '../services/type.service';

@Injectable()
export class TypeEffects {

  loadTypes$ = createEffect( () =>
    this.actions$.pipe(
      ofType(TypeActions.loadTypes),
      switchMap( () =>
        this._type.getTypes().pipe(
          map( ({results}): any => TypeActions.saveypes({ types: results, error:undefined, status: EntityStatus.Loaded})),
          catchError( (error) => {
            return of(
              TypeActions.saveypes({ types: [], error, status: EntityStatus.Error}),
              TypeActions.loadTypesFailure({message: 'Error loading types'})
            )
          }),
        )
      )
    )
  );

  loadTypesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TypeActions.loadTypesFailure),
      tap(({message}) => this.presentToast(message, 'danger')),
    ), { dispatch: false }
  );

  loadTypeInit$ = createEffect(() =>
    of(TypeActions.loadTypes())
  );

  constructor(
    private actions$: Actions,
    private _type: TypeService,
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

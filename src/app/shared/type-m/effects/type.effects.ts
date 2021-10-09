import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
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
          map( ({results}): any => TypeActions.saveTypes({ types: results, error:undefined, status: EntityStatus.Loaded})),
          catchError( (error) => {
            return of(
              TypeActions.saveTypes({ types: [], error, status: EntityStatus.Error}),
              TypeActions.loadTypesFailure({message: 'ERRORS.ERROR_LOAD_TYPE'})
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
              TypeActions.loadTypesFailure({message: 'ERRORS.ERROR_LOAD_TYPES'})
            )
          }),
        )
      )
    )
  );

  loadTypesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TypeActions.loadTypesFailure),
      tap(({message}) => this.presentToast(this.translate.instant(message), 'danger')),
    ), { dispatch: false }
  );

  loadTypeInit$ = createEffect(() =>
    of(TypeActions.loadTypes())
  );


  constructor(
    private actions$: Actions,
    private _type: TypeService,
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

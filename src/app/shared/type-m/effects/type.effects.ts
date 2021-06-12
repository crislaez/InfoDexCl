import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, filter, tap, withLatestFrom } from 'rxjs/operators';
import { TypeActions } from '../actions';
import { TypeService } from '../services/type.service';
import { of } from 'rxjs';


@Injectable()
export class TypeEffects {

  loadTypes$ = createEffect( () =>
    this.actions$.pipe(
      ofType(TypeActions.loadTypes),
      switchMap( () =>
        this._type.getTypes().pipe(
          map( ({results}): any => TypeActions.saveypes({ types: results})),
          catchError( () => [TypeActions.saveypes({ types: []})]),
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
    private location: Location
  ){}
}

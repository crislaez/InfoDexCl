import { createAction, props } from '@ngrx/store';
import { EntityStatus } from '../../utils/utils/functions';
import { Type } from '../models';


export const loadTypes = createAction(
  '[Type] Load types'
);

export const saveTypes = createAction(
  '[Type] Save types',
  props<{types: Type[], error:unknown, status: EntityStatus}>()
);



export const loadType = createAction(
  '[Type] Load type',
  props<{typeName: string}>()
);

export const saveType = createAction(
  '[Type] Save type',
  props<{pokemonType: Type, error:unknown, status: EntityStatus}>()
);

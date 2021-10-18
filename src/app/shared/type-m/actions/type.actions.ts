import { createAction, props, union} from '@ngrx/store';
import { Type } from '../models';
import { EntityStatus } from '../../shared/utils/utils';


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



const all = union({
  loadTypes,
  saveTypes,
  loadType,
  saveType
})

export type TypeActionsUnion = typeof all;

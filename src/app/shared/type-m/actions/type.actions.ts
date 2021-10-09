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

export const loadTypesFailure = createAction(
  '[Type] Load types failure',
  props<{message: string}>()
);


export const loadType = createAction(
  '[Type] Load type',
  props<{typeName: string}>()
);

export const saveType = createAction(
  '[Type] Save type',
  props<{pokemonType: Type, error:unknown, status: EntityStatus}>()
);

export const loadTypeFailure = createAction(
  '[Type] Load type failure',
  props<{message: string}>()
);



const all = union({
  loadTypes,
  saveTypes,
  loadTypesFailure,
  loadType,
  saveType,
  loadTypeFailure
})

export type TypeActionsUnion = typeof all;

import { createAction, props, union} from '@ngrx/store';
import { Type } from '../models';
import { EntityStatus } from '../../shared/utils/utils';


export const loadTypes = createAction(
  '[Type] Load types'
);

export const saveypes = createAction(
  '[Type] Save types',
  props<{types: Type[], error:unknown, status: EntityStatus}>()
);

export const loadTypesFailure = createAction(
  '[Type] Load types failure',
  props<{message: string}>()
);



const all = union({
  loadTypes,
  saveypes
})

export type TypeActionsUnion = typeof all;

import { createAction, props, union} from '@ngrx/store';
import { Type } from '../models';

export const loadTypes = createAction('[Type] Load types');
export const saveypes = createAction('[Type] Save types', props<{types: Type[]}>());


const all = union({
  loadTypes,
  saveypes
})

export type TypeActionsUnion = typeof all;

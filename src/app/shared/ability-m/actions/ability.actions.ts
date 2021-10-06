import { createAction, props, union} from '@ngrx/store';
import { Ability } from '../models';
import { EntityStatus } from '../../shared/utils/utils';


export const LoadAbilities = createAction(
  '[Ability] Load abilities'
);

export const saveAbilities = createAction(
  '[Ability] Save abilities',
  props<{abilities: Ability[], error:unknown, status: EntityStatus}>()
);

export const LoadAbilitiesFailure = createAction(
  '[Ability] Load abilities failure',
  props<{message: string}>()
);



const all = union({
  LoadAbilities,
  saveAbilities
})

export type AbilityActionsUnion = typeof all;

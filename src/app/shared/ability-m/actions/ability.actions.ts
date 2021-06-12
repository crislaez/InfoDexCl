import { createAction, props, union} from '@ngrx/store';
import { Ability } from '../models';

export const LoadAbilities = createAction('[Ability] Load abilities');
export const saveAbilities = createAction('[Ability] Save abilities', props<{abilities: Ability[]}>());


const all = union({
  LoadAbilities,
  saveAbilities
})

export type AbilityActionsUnion = typeof all;

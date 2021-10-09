import { createAction, props, union} from '@ngrx/store';
import { Ability } from '../models';
import { EntityStatus } from '../../shared/utils/utils';


export const loadAbilities = createAction(
  '[Ability] Load abilities'
);

export const saveAbilities = createAction(
  '[Ability] Save abilities',
  props<{abilities: Ability[], error:unknown, status: EntityStatus}>()
);

export const loadAbilitiesFailure = createAction(
  '[Ability] Load abilities failure',
  props<{message: string}>()
);


export const loadAbility = createAction(
  '[Ability] Load ability',
  props<{abilityyName: string}>()
);

export const saveAbility = createAction(
  '[Ability] Save ability',
  props<{ability: Ability, error:unknown, status: EntityStatus}>()
);

export const loadAbilityFailure = createAction(
  '[Ability] Load ability failure',
  props<{message: string}>()
);



const all = union({
  loadAbilities,
  saveAbilities,
  loadAbilitiesFailure,
  loadAbility,
  saveAbility,
  loadAbilityFailure
})

export type AbilityActionsUnion = typeof all;

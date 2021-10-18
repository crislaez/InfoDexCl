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



export const loadAbility = createAction(
  '[Ability] Load ability',
  props<{abilityyName: string}>()
);

export const saveAbility = createAction(
  '[Ability] Save ability',
  props<{ability: Ability, error:unknown, status: EntityStatus}>()
);



const all = union({
  loadAbilities,
  saveAbilities,
  loadAbility,
  saveAbility
})

export type AbilityActionsUnion = typeof all;

import { createAction, props, union} from '@ngrx/store';
import { Ability } from '../models';
import { EntityStatus } from '../../utils/utils/functions';


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

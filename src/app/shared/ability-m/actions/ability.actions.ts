import { createAction, props, union} from '@ngrx/store';
import { Ability } from '../models';
import { EntityStatus } from '../../shared/utils/utils';


export const LoadAbilities = createAction(
  '[Ability] Load abilities'
);

export const SaveAbilities = createAction(
  '[Ability] Save abilities',
  props<{abilities: Ability[], error:unknown, status: EntityStatus}>()
);

export const LoadAbilitiesFailure = createAction(
  '[Ability] Load abilities failure',
  props<{message: string}>()
);


export const LoadAbility = createAction(
  '[Ability] Load ability',
  props<{abilityyName: string}>()
);

export const SaveAbility = createAction(
  '[Ability] Save ability',
  props<{ability: Ability, error:unknown, status: EntityStatus}>()
);

export const LoadAbilityFailure = createAction(
  '[Ability] Load ability failure',
  props<{message: string}>()
);



const all = union({
  LoadAbilities,
  SaveAbilities,
  LoadAbilitiesFailure,
  LoadAbility,
  SaveAbility,
  LoadAbilityFailure
})

export type AbilityActionsUnion = typeof all;

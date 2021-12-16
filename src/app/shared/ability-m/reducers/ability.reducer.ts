import { createReducer, on  } from '@ngrx/store';
import * as AbilityActions from '../actions/ability.actions';
import { Ability } from '../models';
import { EntityStatus } from '../../utils/utils/functions';

export const abilityFeatureKey = 'ability';


export interface State{
  abilities?: Ability[];
  status?: EntityStatus;
  error:unknown;

  ability?: Ability;
  abilityStatus?: EntityStatus;
  abilityError?: unknown;
}

const initialState: State = {
  abilities: [],
  status: EntityStatus.Initial,
  error:undefined,
  ability: {},
  abilityStatus: EntityStatus.Initial,
  abilityError: undefined
}


export const reducer = createReducer(
  initialState,
  on(AbilityActions.loadAbilities, (state) => ({...state,  error :undefined, status: EntityStatus.Pending})),
  on(AbilityActions.saveAbilities, (state, { abilities, error, status }) => ({...state, abilities, error, status })),

  on(AbilityActions.loadAbility, (state) => ({...state,  abilityError:undefined, abilityStatus: EntityStatus.Pending})),
  on(AbilityActions.saveAbility, (state, { ability, error, status }) => ({...state, ability, abilityError: error, abilityStatus: status })),
);


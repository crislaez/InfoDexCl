import { createReducer, on  } from '@ngrx/store';
import { AbilityActions } from '../actions';
import { Ability } from '../models';
import { EntityStatus } from '../../utils/utils/functions';

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


const AbilitiesReducer = createReducer(
  initialState,
  on(AbilityActions.loadAbilities, (state) => ({...state,  error :undefined, status: EntityStatus.Pending})),
  on(AbilityActions.saveAbilities, (state, { abilities, error, status }) => ({...state, abilities, error, status })),

  on(AbilityActions.loadAbility, (state) => ({...state,  abilityError:undefined, abilityStatus: EntityStatus.Pending})),
  on(AbilityActions.saveAbility, (state, { ability, error, status }) => ({...state, ability, abilityError: error, abilityStatus: status })),
);

export function reducer(state: State | undefined, action: AbilityActions.AbilityActionsUnion){
  return AbilitiesReducer(state, action);
}

export const getAbilities = (state: State) => state?.abilities;
export const getStatus = (state: State) => state?.status;
export const getError = (state: State) => state?.error;

export const getAbility = (state: State) => state?.ability;
export const getAbilityStatus = (state: State) => state?.abilityStatus;
export const getAbilityError = (state: State) => state?.abilityError;

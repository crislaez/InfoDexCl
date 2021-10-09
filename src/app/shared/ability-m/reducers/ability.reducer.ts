import { createReducer, on  } from '@ngrx/store';
import { AbilityActions } from '../actions';
import { Ability } from '../models';
import { EntityStatus } from '../../shared/utils/utils';

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
  ability: null,
  abilityStatus: EntityStatus.Initial,
  abilityError: undefined
}


const AbilitiesReducer = createReducer(
  initialState,
  on(AbilityActions.LoadAbilities, (state) => ({...state, status: EntityStatus.Pending})),
  on(AbilityActions.SaveAbilities, (state, { abilities, error, status }) => ({...state, abilities, error, status })),

  on(AbilityActions.LoadAbility, (state) => ({...state, abilityStatus: EntityStatus.Pending})),
  on(AbilityActions.SaveAbility, (state, { ability, error, status }) => ({...state, ability, abilityError: error, abilityStatus: status })),
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

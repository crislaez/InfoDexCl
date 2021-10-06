import { createReducer, on  } from '@ngrx/store';
import { AbilityActions } from '../actions';
import { Ability } from '../models';
import { EntityStatus } from '../../shared/utils/utils';

export interface State{
  abilities?: Ability[];
  status?: EntityStatus;
  error:unknown;
}

const initialState: State = {
  abilities: [],
  status: EntityStatus.Initial,
  error:undefined
}


const AbilitiesReducer = createReducer(
  initialState,
  on(AbilityActions.LoadAbilities, (state) => ({...state, status: EntityStatus.Pending})),
  on(AbilityActions.saveAbilities, (state, { abilities, error, status }) => ({...state, abilities, error, status })),
);

export function reducer(state: State | undefined, action: AbilityActions.AbilityActionsUnion){
  return AbilitiesReducer(state, action);
}

export const getAbilities = (state: State) => state?.abilities;
export const getStatus = (state: State) => state?.status;
export const getError = (state: State) => state?.error;

import { createReducer, on  } from '@ngrx/store';
import { AbilityActions } from '../actions';
import { Ability } from '../models';


interface Status {
  pending?: boolean;
  error?: string;
}
export interface State{
  abilities?: Ability[];
  pending?: boolean;
}

const initialState: State = {
  pending: false,
  abilities: [],
}


const AbilitiesReducer = createReducer(
  initialState,
  on(AbilityActions.LoadAbilities, (state) => ({...state, pending: true})),
  on(AbilityActions.saveAbilities, (state, { abilities }) => ({...state, abilities, pending: false })),
);

export function reducer(state: State | undefined, action: AbilityActions.AbilityActionsUnion){
  return AbilitiesReducer(state, action);
}

export const getAbilities = (state: State) => state?.abilities;

export const getPending = (state: State) => state?.pending;

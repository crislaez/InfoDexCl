import { createReducer, on  } from '@ngrx/store';
import { TypeActions } from '../actions';
import { Type } from '../models';


interface Status {
  pending?: boolean;
  error?: string;
}
export interface State{
  types?: Type[];
  pending?: boolean;
}

const initialState: State = {
  pending: false,
  types: [],
}


const typeReducer = createReducer(
  initialState,
  on(TypeActions.loadTypes, (state) => ({...state, pending: true})),
  on(TypeActions.saveypes, (state, { types }) => ({...state, types, pending: false })),
);

export function reducer(state: State | undefined, action: TypeActions.TypeActionsUnion){
  return typeReducer(state, action);
}

export const getTypes = (state: State) => state?.types;

export const getPending = (state: State) => state?.pending;

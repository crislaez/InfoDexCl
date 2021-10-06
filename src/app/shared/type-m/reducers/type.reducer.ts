import { createReducer, on  } from '@ngrx/store';
import { TypeActions } from '../actions';
import { Type } from '../models';
import { EntityStatus } from '../../shared/utils/utils';

export interface State{
  types?: Type[];
  status?: EntityStatus;
  error:unknown;
}

const initialState: State = {
  types: [],
  status: EntityStatus.Initial,
  error:undefined
}


const typeReducer = createReducer(
  initialState,
  on(TypeActions.loadTypes, (state) => ({...state, status: EntityStatus.Pending})),
  on(TypeActions.saveypes, (state, { types, error, status }) => ({...state, types, error, status })),
);

export function reducer(state: State | undefined, action: TypeActions.TypeActionsUnion){
  return typeReducer(state, action);
}

export const getTypes = (state: State) => state?.types;
export const getStatus = (state: State) => state?.status;
export const getError = (state: State) => state?.error;

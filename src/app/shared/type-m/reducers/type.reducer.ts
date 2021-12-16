import { createReducer, on  } from '@ngrx/store';
import { TypeActions } from '../actions';
import { Type } from '../models';
import { EntityStatus } from '../../utils/utils/functions';

export interface State{
  types?: Type[];
  status?: EntityStatus;
  error:unknown;

  pokemonType?: Type;
  typeStatus?: EntityStatus;
  typeError:unknown;
}

const initialState: State = {
  types: [],
  status: EntityStatus.Initial,
  error: undefined,
  pokemonType: {},
  typeStatus: EntityStatus.Initial,
  typeError: undefined
}


const typeReducer = createReducer(
  initialState,
  on(TypeActions.loadTypes, (state) => ({...state, error: undefined, status: EntityStatus.Pending})),
  on(TypeActions.saveTypes, (state, { types, error, status }) => ({...state, types, error, status })),

  on(TypeActions.loadType, (state) => ({...state, typeError: undefined, typeStatus: EntityStatus.Pending})),
  on(TypeActions.saveType, (state, { pokemonType, error, status }) => ({...state, pokemonType, typeError:error, typeStatus: status })),
);

export function reducer(state: State | undefined, action: TypeActions.TypeActionsUnion){
  return typeReducer(state, action);
}

export const getTypes = (state: State) => state?.types;
export const getStatus = (state: State) => state?.status;
export const getError = (state: State) => state?.error;

export const getType = (state: State) => state?.pokemonType;
export const getTypeStatus = (state: State) => state?.typeStatus;
export const getTypeError = (state: State) => state?.typeError;

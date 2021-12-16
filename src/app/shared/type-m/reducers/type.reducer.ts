import { createReducer, on  } from '@ngrx/store';
import * as TypeActions from '../actions/type.actions';
import { Type } from '../models';
import { EntityStatus } from '../../utils/utils/functions';

export const typeFeatureKey = 'type';

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


export const reducer = createReducer(
  initialState,
  on(TypeActions.loadTypes, (state) => ({...state, error: undefined, status: EntityStatus.Pending})),
  on(TypeActions.saveTypes, (state, { types, error, status }) => ({...state, types, error, status })),

  on(TypeActions.loadType, (state) => ({...state, typeError: undefined, typeStatus: EntityStatus.Pending})),
  on(TypeActions.saveType, (state, { pokemonType, error, status }) => ({...state, pokemonType, typeError:error, typeStatus: status })),
);

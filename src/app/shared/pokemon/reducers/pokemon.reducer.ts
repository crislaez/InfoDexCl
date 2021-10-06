import { createReducer, on  } from '@ngrx/store';
import { PokemonActions } from '../actions';
import { Pokemon } from '../models';
import { EntityStatus } from '../../shared/utils/utils';

export interface State{
  pokemons?: Pokemon[];
  status?: EntityStatus;
  error:unknown;
}

const initialState: State = {
  pokemons: [],
  status: EntityStatus.Initial,
  error:undefined
}


const PokemonReducer = createReducer(
  initialState,
  on(PokemonActions.loadPokemons, (state) => ({ ...state, status: EntityStatus.Pending })),
  on(PokemonActions.savePokemons, (state, { pokemons, error, status }) => ({...state, pokemons, error, status })),
);

export function reducer(state: State | undefined, action: PokemonActions.PokemonActionsUnion){
  return PokemonReducer(state, action);
}

export const getPokemons = (state: State) => state?.pokemons;
export const getStatus = (state: State) => state?.status;
export const getError = (state: State) => state?.error;

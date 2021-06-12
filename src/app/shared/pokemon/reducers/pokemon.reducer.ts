import { createReducer, on  } from '@ngrx/store';
import { PokemonActions } from '../actions';
import { Pokemon } from '../models';


interface Status {
  pending?: boolean;
  error?: string;
}
export interface State{
  pokemons?: Pokemon[];
  pending?: boolean;
}

const initialState: State = {
  pending: false,
  pokemons: [],
}


const PokemonReducer = createReducer(
  initialState,
  on(PokemonActions.loadPokemons, (state) => ({...state, pending: true})),
  on(PokemonActions.savePokemons, (state, { pokemons }) => ({...state, pokemons, pending: false })),
);

export function reducer(state: State | undefined, action: PokemonActions.PokemonActionsUnion){
  return PokemonReducer(state, action);
}

export const getPokemons = (state: State) => state?.pokemons;

export const getPending = (state: State) => state?.pending;

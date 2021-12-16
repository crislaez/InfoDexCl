import { createReducer, on  } from '@ngrx/store';
import { PokemonActions } from '../actions';
import { Pokemon } from '../models';
import { EntityStatus } from '../../utils/utils/functions';

export interface State{
  pokemons?: Pokemon[];
  status?: EntityStatus;
  error?: unknown;
  pokemon?: Pokemon;
  pokemonStatus?: EntityStatus;
  pokemonError?: unknown;
}

const initialState: State = {
  pokemons: [],
  status: EntityStatus.Initial,
  error:undefined,
  pokemon: {},
  pokemonStatus: EntityStatus.Initial,
  pokemonError:undefined
}


const PokemonReducer = createReducer(
  initialState,
  on(PokemonActions.loadPokemons, (state) => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(PokemonActions.savePokemons, (state, { pokemons, error, status }) => ({...state, pokemons, error, status })),

  on(PokemonActions.loadPokemon, (state) => ({ ...state, pokemonError: undefined, pokemonStatus: EntityStatus.Pending })),
  on(PokemonActions.savePokemon, (state, { pokemon, error, status }) => ({...state, pokemon, pokemonError: error, pokemonStatus: status })),
);

export function reducer(state: State | undefined, action: PokemonActions.PokemonActionsUnion){
  return PokemonReducer(state, action);
}

export const getPokemons = (state: State) => state?.pokemons;
export const getStatus = (state: State) => state?.status;
export const getError = (state: State) => state?.error;

export const getPokemon = (state: State) => state?.pokemon;
export const getPokemonStatus = (state: State) => state?.pokemonStatus;
export const getPokemonError = (state: State) => state?.pokemonError;

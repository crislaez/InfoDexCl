import { createReducer, on  } from '@ngrx/store';
import * as PokemonActions from '../actions/pokemon.actions';
import { Pokemon } from '../models';
import { EntityStatus } from '../../utils/utils/functions';

export const pokemonFeatureKey = 'pokemon';

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


export const reducer = createReducer(
  initialState,
  on(PokemonActions.loadPokemons, (state) => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(PokemonActions.savePokemons, (state, { pokemons, error, status }) => ({...state, pokemons, error, status })),

  on(PokemonActions.loadPokemon, (state) => ({ ...state, pokemonError: undefined, pokemonStatus: EntityStatus.Pending })),
  on(PokemonActions.savePokemon, (state, { pokemon, error, status }) => ({...state, pokemon, pokemonError: error, pokemonStatus: status })),
);


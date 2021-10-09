import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPokemon from './pokemon.reducer';

export const pokemonKey = 'pokemon';

export interface State {
  [pokemonKey]: fromPokemon.State
}

export const reducer = fromPokemon.reducer;

export const getPokemonState = createFeatureSelector<State, fromPokemon.State>(pokemonKey);


export const getPokemons = createSelector(
  getPokemonState,
  fromPokemon.getPokemons
)

export const getStatus = createSelector(
  getPokemonState,
  fromPokemon.getStatus
)

export const getError = createSelector(
  getPokemonState,
  fromPokemon.getError
)

export const getPokemon = createSelector(
  getPokemonState,
  fromPokemon.getPokemon
)

export const getPokemonStatus = createSelector(
  getPokemonState,
  fromPokemon.getPokemonStatus
)

export const getPokemonError = createSelector(
  getPokemonState,
  fromPokemon.getPokemonError
)



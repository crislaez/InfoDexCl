import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPokemon from '../reducers/pokemon.reducer';

export const getPokemonState = createFeatureSelector<fromPokemon.State>(
  fromPokemon.pokemonFeatureKey
);


export const getPokemons = createSelector(
  getPokemonState,
  (state) => state?.pokemons
);

export const getStatus = createSelector(
  getPokemonState,
  (state) => state?.status
)

export const getError = createSelector(
  getPokemonState,
  (state) => state?.error
)

export const getPokemon = createSelector(
  getPokemonState,
  (state) => state?.pokemon
)

export const getPokemonStatus = createSelector(
  getPokemonState,
  (state) => state?.pokemonStatus
)

export const getPokemonError = createSelector(
  getPokemonState,
  (state) => state?.pokemonError
)

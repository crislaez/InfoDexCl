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

export const getPending = createSelector(
  getPokemonState,
  fromPokemon.getPending
)

// export const getChaptersByBook = (passageName: string) => createSelector(
//   getBooks,
//  (getBooks) => {
//    return getBooks?.find( ({passage}) => passage == passageName)?.chapters || []
//  }
// )



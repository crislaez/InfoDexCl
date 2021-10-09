import { createAction, props, union} from '@ngrx/store';
import { Pokemon } from '../models';
import { EntityStatus } from '../../shared/utils/utils';


export const loadPokemons = createAction(
  '[Pokemon] Load pokemons'
);

export const savePokemons = createAction(
  '[Pokemon] Save pokemons',
  props<{pokemons: Pokemon[], error:unknown, status: EntityStatus}>()
);

export const loadPokemonsFailure = createAction(
  '[Pokemon] Load pokemons failure',
  props<{message: string}>()
);



export const loadPokemon = createAction(
  '[Pokemon] Load pokemon',
  props<{pokemonName: string}>()
);

export const savePokemon = createAction(
  '[Pokemon] Save pokemon',
  props<{pokemon: Pokemon, error:unknown, status: EntityStatus}>()
);

export const loadPokemonFailure = createAction(
  '[Pokemon] Load pokemon failure',
  props<{message: string}>()
);



const all = union({
  loadPokemons,
  savePokemons,
  loadPokemonsFailure,
  loadPokemon,
  savePokemon,
  loadPokemonFailure
})

export type PokemonActionsUnion = typeof all;

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



export const loadPokemon = createAction(
  '[Pokemon] Load pokemon',
  props<{pokemonName: string}>()
);

export const savePokemon = createAction(
  '[Pokemon] Save pokemon',
  props<{pokemon: Pokemon, error:unknown, status: EntityStatus}>()
);



const all = union({
  loadPokemons,
  savePokemons,
  loadPokemon,
  savePokemon
})

export type PokemonActionsUnion = typeof all;

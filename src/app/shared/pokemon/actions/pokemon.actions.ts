import { createAction, props } from '@ngrx/store';
import { EntityStatus } from '../../utils/utils/functions';
import { Pokemon } from '../models';


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



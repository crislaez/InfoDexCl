import { createAction, props, union} from '@ngrx/store';
import { Pokemon } from '../models';

export const loadPokemons = createAction('[Pokemon] Load pokemons');
export const savePokemons = createAction('[Pokemon] Save pokemons', props<{pokemons: Pokemon[]}>());


const all = union({
  loadPokemons,
  savePokemons
})

export type PokemonActionsUnion = typeof all;

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '@pokemon/shared/notification/notification.module';
import { PokemonEffects } from './effects/pokemon.effects';
import * as fromPokemon from './reducers';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NotificationModule,
    StoreModule.forFeature(fromPokemon.pokemonKey, fromPokemon.reducer),
    EffectsModule.forFeature([PokemonEffects]),
  ]
})
export class PokemonModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoreModule} from '@ngrx/store';
import * as fromPokemon from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffects } from './effects/pokemon.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(fromPokemon.pokemonKey, fromPokemon.reducer),
    EffectsModule.forFeature([PokemonEffects]),
  ]
})
export class PokemonModule {}

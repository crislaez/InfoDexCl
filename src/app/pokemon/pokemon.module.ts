import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PokemonPageRoutingModule } from './pokemon-routing.module';
import { PokemonPage } from './containers/pokemon.page';
import { TranslateModule } from '@ngx-translate/core';
import { PokemonModule } from '@pokemon/shared/pokemon/pokemon.module';
import { SharedModule } from '@pokemon/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PokemonModule,
    TranslateModule.forChild(),
    PokemonPageRoutingModule
  ],
  declarations: [
    PokemonPage
  ]
})
export class PokemonPageModule {}

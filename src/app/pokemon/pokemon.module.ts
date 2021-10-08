import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PokemonPageRoutingModule } from './pokemon-routing.module';
import { PokemonPage } from './containers/pokemon.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    PokemonPageRoutingModule
  ],
  declarations: [
    PokemonPage
  ]
})
export class PokemonPageModule {}

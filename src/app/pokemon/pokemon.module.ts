import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GenericsModule } from '@pokemon/shared-ui/generics/generics.module';
import { PokemonModule } from '@pokemon/shared/pokemon/pokemon.module';
import { SharedModule } from '@pokemon/shared/shared/shared.module';
import { PokemonPage } from './containers/pokemon.page';
import { PokemonPageRoutingModule } from './pokemon-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PokemonModule,
    GenericsModule,
    TranslateModule.forChild(),
    PokemonPageRoutingModule
  ],
  declarations: [
    PokemonPage
  ]
})
export class PokemonPageModule {}

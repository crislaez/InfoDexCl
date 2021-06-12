import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './containers/home.page';
import { SharedModule } from '../shared/shared/shared.module';
import { PokemonModule } from '../shared/pokemon/pokemon.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    PokemonModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

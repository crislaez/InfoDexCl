import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GenericsModule } from '@pokemon/shared-ui/generics/generics.module';
import { PokemonModule } from '@pokemon/shared/pokemon/pokemon.module';
import { SharedModule } from '@pokemon/shared/shared/shared.module';
import { HomePage } from './containers/home.page';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    PokemonModule,
    GenericsModule,
    TranslateModule.forChild(),
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

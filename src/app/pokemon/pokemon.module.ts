import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GenericsModule } from '@pokemon/shared-ui/generics/generics.module';
import { PokemonModule } from '@pokemon/shared/pokemon/pokemon.module';
import { SharedModule } from '@pokemon/shared/shared/shared.module';
import { AbilitiesCardComponent } from './components/abilities-card.component';
import { AlternativesFormCardComponent } from './components/alternatives-form-card.component';
import { BaseExperienceCardComponent } from './components/base-experience-card.component';
import { EvolutionChainCardComponent } from './components/evolution-chain-card.component';
import { GenerationsImagesCardComponent } from './components/generations-images-card.component';
import { MovesCardComponent } from './components/moves-card.component';
import { PokemonSelectedCardComponent } from './components/pokemon-selected-card.component';
import { StatsCardComponent } from './components/stats-card.component';
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
    PokemonPage,
    AlternativesFormCardComponent,
    EvolutionChainCardComponent,
    GenerationsImagesCardComponent,
    MovesCardComponent,
    StatsCardComponent,
    AbilitiesCardComponent,
    BaseExperienceCardComponent,
    PokemonSelectedCardComponent
  ]
})
export class PokemonPageModule {}

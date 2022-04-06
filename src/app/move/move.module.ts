import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GenericsModule } from '@pokemon/shared-ui/generics/generics.module';
import { MoveMModule } from '../shared/move-m/move-m.module';
import { SharedModule } from '../shared/shared/shared.module';
import { MoveFeaturesComponent } from './components/move-features.component';
import { PokemonMoveCardComponent } from './components/pokemon-move-card.component';
import { MovePage } from './containers/move.page';
import { MovesPage } from './containers/moves.page';
import { MovePageRoutingModule } from './move-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MoveMModule,
    GenericsModule,
    TranslateModule.forChild(),
    MovePageRoutingModule
  ],
  declarations: [
    MovePage,
    MovesPage,
    PokemonMoveCardComponent,
    MoveFeaturesComponent
  ]
})
export class MovePageModule {}

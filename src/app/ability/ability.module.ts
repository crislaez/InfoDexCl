import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GenericsModule } from '@pokemon/shared-ui/generics/generics.module';
import { AbilityMModule } from '../shared/ability-m/ability-m.module';
import { SharedModule } from '../shared/shared/shared.module';
import { AbilityPageRoutingModule } from './ability-routing.module';
import { PokemonsAbilityCardComponent } from './components/pokemons-ability-card.component';
import { AbilitiesPage } from './containers/abilities.page';
import { AbilityPage } from './containers/ability.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AbilityMModule,
    GenericsModule,
    TranslateModule.forChild(),
    AbilityPageRoutingModule
  ],
  declarations: [
    AbilityPage,
    AbilitiesPage,
    PokemonsAbilityCardComponent
  ]
})
export class AbilityPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AbilityPageRoutingModule } from './ability-routing.module';
import { AbilityPage } from './containers/ability.page';
import { AbilitiesPage } from './containers/abilities.page';
import { SharedModule } from '../shared/shared/shared.module';
import { AbilityMModule } from '../shared/ability-m/ability-m.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AbilityMModule,
    AbilityPageRoutingModule
  ],
  declarations: [
    AbilityPage,
    AbilitiesPage
  ]
})
export class AbilityPageModule {}

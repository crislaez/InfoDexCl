import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StoreModule} from '@ngrx/store';
import * as fromAbility from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AbilityEffects } from './effects/ability.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(fromAbility.abilityKey, fromAbility.reducer),
    EffectsModule.forFeature([AbilityEffects]),
  ]
})
export class AbilityMModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '@pokemon/shared/notification/notification.module';
import { AbilityEffects } from './effects/ability.effects';
import * as fromAbility from './reducers';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NotificationModule,
    StoreModule.forFeature(fromAbility.abilityKey, fromAbility.reducer),
    EffectsModule.forFeature([AbilityEffects]),
  ]
})
export class AbilityMModule {}

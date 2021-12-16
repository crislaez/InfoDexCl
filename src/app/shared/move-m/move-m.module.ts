import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '@pokemon/shared/notification/notification.module';
import { MoveEffects } from './effects/move.effects';
import * as fromMove from './reducers/move.reducer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NotificationModule,
    StoreModule.forFeature(fromMove.moveFeatureKey, fromMove.reducer),
    EffectsModule.forFeature([MoveEffects]),
  ]
})
export class MoveMModule {}

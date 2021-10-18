import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '@pokemon/shared/notification/notification.module';
import { TypeEffects } from './effects/type.effects';
import * as fromType from './reducers';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NotificationModule,
    StoreModule.forFeature(fromType.typeKey, fromType.reducer),
    EffectsModule.forFeature([TypeEffects]),
  ]
})
export class TypeMModule {}

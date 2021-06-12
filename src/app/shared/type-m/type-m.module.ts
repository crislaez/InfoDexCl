import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StoreModule} from '@ngrx/store';
import * as fromType from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { TypeEffects } from './effects/type.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(fromType.typeKey, fromType.reducer),
    EffectsModule.forFeature([TypeEffects]),
  ]
})
export class TypeMModule {}

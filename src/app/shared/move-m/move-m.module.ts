import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StoreModule} from '@ngrx/store';
import * as fromMove from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { MoveEffects } from './effects/move.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(fromMove.moveKey, fromMove.reducer),
    EffectsModule.forFeature([MoveEffects]),
  ]
})
export class MoveMModule {}

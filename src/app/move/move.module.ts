import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MoveMModule } from '../shared/move-m/move-m.module';
import { SharedModule } from '../shared/shared/shared.module';
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
    TranslateModule.forChild(),
    MovePageRoutingModule
  ],
  declarations: [
    MovePage,
    MovesPage
  ]
})
export class MovePageModule {}

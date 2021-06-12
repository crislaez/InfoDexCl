import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MovePageRoutingModule } from './move-routing.module';
import { MovePage } from './containers/move.page';
import { MovesPage } from './containers/moves.page';
import { SharedModule } from '../shared/shared/shared.module';
import { MoveMModule } from '../shared/move-m/move-m.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MoveMModule,
    MovePageRoutingModule
  ],
  declarations: [
    MovePage,
    MovesPage
  ]
})
export class MovePageModule {}

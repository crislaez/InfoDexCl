import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TypePageRoutingModule } from './type-routing.module';
import { TypePage } from './container/type.page';
import { TypesPage } from './container/types.page';
import { SharedModule } from '../shared/shared/shared.module';
import { TypeMModule } from '../shared/type-m/type-m.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TypeMModule,
    TypePageRoutingModule
  ],
  declarations: [
    TypePage,
    TypesPage
   ]
})
export class TypePageModule {}

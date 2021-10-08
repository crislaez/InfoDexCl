import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared/shared.module';
import { TypeMModule } from '../shared/type-m/type-m.module';
import { TypePage } from './container/type.page';
import { TypesPage } from './container/types.page';
import { TypePageRoutingModule } from './type-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TypeMModule,
    TranslateModule.forChild(),
    TypePageRoutingModule
  ],
  declarations: [
    TypePage,
    TypesPage
   ]
})
export class TypePageModule {}

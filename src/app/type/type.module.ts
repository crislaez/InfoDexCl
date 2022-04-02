import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GenericsModule } from '@pokemon/shared-ui/generics/generics.module';
import { SharedModule } from '../shared/shared/shared.module';
import { TypeMModule } from '../shared/type-m/type-m.module';
import { TypeCardComponent } from './components/type-card.component';
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
    GenericsModule,
    TranslateModule.forChild(),
    TypePageRoutingModule
  ],
  declarations: [
    TypePage,
    TypesPage,
    TypeCardComponent
  ]
})
export class TypePageModule {}

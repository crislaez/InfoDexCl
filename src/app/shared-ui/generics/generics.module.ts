import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SpinnerComponent } from './components/spinner.component';
import { NoDataComponent } from './components/no-data.component';

const COMPONENTS = [
  SpinnerComponent,
  NoDataComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild()
  ],
  exports:[
    ...COMPONENTS
  ]
})
export class GenericsModule { }

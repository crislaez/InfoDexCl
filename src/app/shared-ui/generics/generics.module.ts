import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollComponent } from './components/infinite-scroll.component';
import { NoDataComponent } from './components/no-data.component';
import { SpinnerComponent } from './components/spinner.component';

const COMPONENTS = [
  SpinnerComponent,
  NoDataComponent,
  InfiniteScrollComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  exports:[
    ...COMPONENTS
  ]
})
export class GenericsModule { }

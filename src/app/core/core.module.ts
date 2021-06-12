import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RootComponent } from './containers/root.page';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  declarations:[
    RootComponent
  ],
  providers: [
    { provide: "windowObject", useValue: window}
  ]

})
export class CoreModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypePage } from './container/type.page';
import { TypesPage } from './container/types.page';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        component: TypesPage
      },
      {
        path:':type',
        component: TypePage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypePageRoutingModule {}

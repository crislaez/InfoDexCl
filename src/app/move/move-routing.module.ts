import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovePage } from './containers/move.page';
import { MovesPage } from './containers/moves.page'

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        component: MovesPage
      },
      {
        path:':move',
        component: MovePage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovePageRoutingModule {}

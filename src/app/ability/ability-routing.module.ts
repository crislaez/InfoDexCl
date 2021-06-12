import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbilityPage } from './containers/ability.page';
import { AbilitiesPage } from './containers/abilities.page';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        component: AbilitiesPage
      },
      {
        path:':ability',
        component: AbilityPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbilityPageRoutingModule {}

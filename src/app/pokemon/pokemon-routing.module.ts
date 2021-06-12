import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonPage } from './containers/pokemon.page';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path:':name',
        component: PokemonPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonPageRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  {
    path: 'pokemon',
    loadChildren: () => import('./pokemon/pokemon.module').then( m => m.PokemonPageModule),
  },
  {
    path: 'ability',
    loadChildren: () => import('./ability/ability.module').then( m => m.AbilityPageModule),
  },
  {
    path: 'move',
    loadChildren: () => import('./move/move.module').then( m => m.MovePageModule),
  },
  {
    path: 'type',
    loadChildren: () => import('./type/type.module').then( m => m.TypePageModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

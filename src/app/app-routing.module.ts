import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LangGuard } from './core/i18n/guards/lang.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    // canLoad: [LangGuard],
   // canActivate: [LangGuard],
  },
  {
    path: 'pokemon',
    loadChildren: () => import('./pokemon/pokemon.module').then( m => m.PokemonPageModule),
   // canActivate: [LangGuard],
  },
  {
    path: 'ability',
    loadChildren: () => import('./ability/ability.module').then( m => m.AbilityPageModule),
   // canActivate: [LangGuard],
  },
  {
    path: 'move',
    loadChildren: () => import('./move/move.module').then( m => m.MovePageModule),
   // canActivate: [LangGuard],
  },
  {
    path: 'type',
    loadChildren: () => import('./type/type.module').then( m => m.TypePageModule),
   // canActivate: [LangGuard],
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

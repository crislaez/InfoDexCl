import { Component, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, startWith, map, switchMap } from 'rxjs/operators';
import { getPokemonImagePrincipal, getPokemonPokedexNumber, isNotData, trackById } from '../../shared/shared/utils/utils';
import { select, Store } from '@ngrx/store';
import { fromType, TypeActions, Type } from 'src/app/shared/type-m';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-types',
  template: `
  <ion-content [fullscreen]="true">

    <!-- HEADER  -->
    <div class="header" no-border>
      <ion-text>
        <h1>Types</h1>
      </ion-text>
    </div>

    <!-- REFRESH -->
    <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <ng-container *ngIf="(types$ | async) as types; else loader">
      <!-- BUSCADOR  -->
      <form class="form-search" (submit)="searchType($event)">
        <ion-item>
          <ion-input name="name" placeholder="type..." [formControl]="type" ></ion-input>
        </ion-item>
        <ion-button type="submit"><ion-icon  name="search-outline"></ion-icon></ion-button>
      </form>

      <!-- TYPES LIST  -->
      <ng-container *ngIf="!loading; else loader">
        <ng-container *ngIf="types?.length > 0; else noTypes">

          <ion-virtual-scroll [items]="types" approxItemHeight="320px" >
            <ion-card class="ion-activatable ripple-parent" *virtualItem="let type; let i = index;"  [ngClass]="getClassColor(type?.name)" [routerLink]="['/type/'+ type?.name]" >
              <ion-card-content class="type-item">
                <ion-label class="capital-letter span-white">{{type?.name}}</ion-label>
              </ion-card-content>
               <!-- RIPPLE EFFECT -->
               <ion-ripple-effect></ion-ripple-effect>
            </ion-card>
          </ion-virtual-scroll>

        </ng-container>
      </ng-container>

    </ng-container>

    <!-- IS NO TYPES  -->
    <ng-template #noTypes>
      <div class="error-serve">
        <span >No types</span>
      </div>
    </ng-template>

    <!-- LOADER  -->
    <ng-template #loader>
      <ion-spinner name="crescent" color="primary"></ion-spinner>
    </ng-template>
  </ion-content>
  `,
  styleUrls: ['./types.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypesPage {

  getPokemonImagePrincipal = getPokemonImagePrincipal
  getPokemonPokedexNumber = getPokemonPokedexNumber
  isNotData = isNotData
  trackById = trackById

  loading = false;
  type = new FormControl('');
  searchResult$ = new EventEmitter()

  types$: Observable<Type[]> = this.searchResult$.pipe(
    startWith(''),
    tap(() => this.loading = true),
    switchMap((result) =>{
      if(result){
        return this.store.pipe(select(fromType.getTypes),
          map(types => types.filter((type: any) => type?.name !== 'unknown')),
          map(types => types.filter((type: any) => type?.name === result?.toLowerCase() || type?.name.includes(result?.toLowerCase()))),
          tap(() => this.loading = false)
        )
      }else{
        return this.store.pipe(select(fromType.getTypes),
        map(types => types.filter((type: any) => type?.name !== 'unknown')),
        tap(() => this.loading = false)
        )
      }
    })
  )


  constructor(private store: Store) {
    // this.abilities$.subscribe(data => console.log(data))
  }

  searchType(event: Event): void{
    event.preventDefault();
    this.searchResult$.next(this.type?.value)
    this.type.reset();
  }

  getClassColor(name): string{
    if(name.toLowerCase() === 'grass') return 'green'
    if(name.toLowerCase() === 'water') return 'water'
    if(name.toLowerCase() === 'bug') return 'bug'
    if(name.toLowerCase() === 'dark') return 'dark'
    if(name.toLowerCase() === 'dragon') return 'dragon'
    if(name.toLowerCase() === 'electric') return 'electric'
    if(name.toLowerCase() === 'fire') return 'fire'
    if(name.toLowerCase() === 'fighting') return 'fighting'
    if(name.toLowerCase() === 'fly' || name.toLowerCase() === 'flying') return 'fly'
    if(name.toLowerCase() === 'ghost') return 'ghost'
    if(name.toLowerCase() === 'ground') return 'ground'
    if(name.toLowerCase() === 'ice') return 'ice'
    if(name.toLowerCase() === 'normal') return 'normal'
    if(name.toLowerCase() === 'poison') return 'poison'
    if(name.toLowerCase() === 'rock') return 'rock'
    if(name.toLowerCase() === 'steel') return 'steel'
    if(name.toLowerCase() === 'psychic') return 'psychic'
    if(name.toLowerCase() === 'fairy') return 'fairy'
  }

  doRefresh(event) {
    setTimeout(() => {
      this.searchResult$.next('')
      event.target.complete();
    }, 500);
  }


}

import { Component, ChangeDetectionStrategy, EventEmitter, ViewChild } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { tap, startWith, map, switchMap } from 'rxjs/operators';
import { getPokemonImagePrincipal, getPokemonPokedexNumber, isNotData, trackById, gotToTop} from '../../shared/shared/utils/utils';
import { select, Store } from '@ngrx/store';
import { fromType, TypeActions, Type } from 'src/app/shared/type-m';
import { FormControl } from '@angular/forms';
import { IonInfiniteScroll } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-types',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

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

    <ng-container *ngIf="(info$ | async) as info; else loader">

      <!-- BUSCADOR  -->
      <form (submit)="searchType($event)" class="fade-in-card">
        <ion-searchbar color="light" placeholder="type..." [formControl]="type" (ionClear)="clearSearch($event)"></ion-searchbar>
      </form>

      <!-- TYPES LIST  -->
      <ng-container *ngIf="!loading; else loader">
        <ng-container *ngIf="info?.types?.length > 0; else noTypes">

          <ion-card class="ion-activatable ripple-parent fade-in-image" *ngFor="let type of info?.types; let i = index; trackBy: trackById"  [ngClass]="getClassColor(type?.name)" [routerLink]="['/type/'+ type?.name]" >
            <ion-card-content class="type-item">
              <ion-label class="capital-letter span-white">{{type?.name}}</ion-label>
            </ion-card-content>
              <!-- RIPPLE EFFECT -->
              <ion-ripple-effect></ion-ripple-effect>
          </ion-card>

          <!-- INFINITE SCROLL  -->
          <ng-container *ngIf="info?.total as total">
            <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event, total)">
              <ion-infinite-scroll-content loadingSpinner="crescent" color="primary">
              </ion-infinite-scroll-content>
            </ion-infinite-scroll>
          </ng-container>

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

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>

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
  gotToTop = gotToTop;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  loading = false;
  perPage: number = 15;
  showButton: boolean = false;

  type = new FormControl('');
  infiniteScroll$ = new EventEmitter();
  searchResult$ = new EventEmitter()

  info$: Observable<any> = combineLatest([
    this.searchResult$.pipe(startWith('')),
    this.infiniteScroll$.pipe(startWith(15)),
  ]).pipe(
    tap(() => this.loading = true),
    switchMap(([result, page]) =>{
      if(result){
        return this.store.pipe(select(fromType.getTypes),
          map(types => types.filter((type: any) => type?.name !== 'unknown')),
          map(types => {
            const filterTypes = (types || []).filter((type: any) => type?.name === result?.toLowerCase() || type?.name.includes(result?.toLowerCase()))
            return{
              types: (filterTypes || []).slice(0, page),
              total:filterTypes?.length
            }
          }),
        )
      }else{
        return this.store.pipe(select(fromType.getTypes),
          map(types => types.filter((type: any) => type?.name !== 'unknown')),
          map(types => {
            return{
              types: (types || []).slice(0, page),
              total:types?.length
            }
          })
        )
      }
    }),
    tap(() => this.loading = false)
  );


  constructor(private store: Store, public platform: Platform) {
    // this.abilities$.subscribe(data => console.log(data))
  }


  //SEARCH
  searchType(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.searchResult$.next(this.type?.value)
    this.clearAll();
  }

  // DELETE SEARCH
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.searchResult$.next('');
    this.clearAll();
  }

  // INIFINITE SCROLL
  loadData(event, total) {
    setTimeout(() => {
      this.perPage = this.perPage + 15;
      if(this.perPage >= total){
        if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = true
      }
      this.infiniteScroll$.next(this.perPage)

      event.target.complete();
    }, 500);
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.searchResult$.next('')
      this.type.reset();
      this.clearAll();

      event.target.complete();
    }, 500);
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  clearAll(): void{
    this.perPage = 15
    this.infiniteScroll$.next(this.perPage)
    if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false
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

}

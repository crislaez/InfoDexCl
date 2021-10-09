import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent, IonInfiniteScroll, Platform } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { fromType } from 'src/app/shared/type-m';
import { getPokemonImagePrincipal, getPokemonPokedexNumber, gotToTop, isNotData, trackById } from '../../shared/shared/utils/utils';

@Component({
  selector: 'app-types',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <!-- HEADER  -->
    <div class="header" no-border>
      <ion-text>
        <h1>{{ 'COMMON.TYPES' | translate }}</h1>
      </ion-text>
    </div>

    <ng-container *ngIf="(info$ | async) as info; else loader">
      <ng-container *ngIf="(status$ | async) as status">
        <ng-container *ngIf="status !== 'pending'; else loader">
          <ng-container *ngIf="status !== 'error'; else serverError">

            <!-- BUSCADOR  -->
            <form (submit)="searchType($event)" class="fade-in-card">
              <ion-searchbar color="light" placeholder="type..." [formControl]="type" (ionClear)="clearSearch($event)"></ion-searchbar>
            </form>

            <!-- TYPES LIST  -->
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
                  <ion-infinite-scroll-content loadingSpinner="crescent" color="primary" class="loadingspinner">
                  </ion-infinite-scroll-content>
                </ion-infinite-scroll>
              </ng-container>

            </ng-container>

          </ng-container>
        </ng-container>
      </ng-container>
    </ng-container>

    <!-- REFRESH -->
    <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <!-- IS ERROR -->
    <ng-template #serverError>
      <div class="error-serve">
        <div>
          <span><ion-icon class="text-second-color big-size" name="cloud-offline-outline"></ion-icon></span>
          <br>
          <span class="item-color">{{ 'COMMON.ERROR' | translate }}</span>
        </div>
      </div>
    </ng-template>

    <!-- IS NO TYPES  -->
    <ng-template #noTypes>
      <div class="error-serve">
        <span >{{ 'COMMON.NO_DATA' | translate }}</span>
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

  showButton: boolean = false;
  statusComponent:{perPage:number, search:string} = {
    perPage:15,
    search:''
  };

  type = new FormControl('');
  infiniteScroll$ = new EventEmitter<{perPage:number, search:string}>();
  status$ = this.store.pipe(select(fromType.getStatus));

  info$: Observable<any> = this.infiniteScroll$.pipe(
    startWith(this.statusComponent),
    switchMap(({perPage, search}) =>{
      return this.store.select(fromType.getTypes).pipe(
        map(types => (types || []).filter(({name}) => name !== 'unknown')),
        map(types => {
          let result = [...types];

          if(!!search){
            result = (types || []).filter(({name}) => name === search?.toLowerCase() || name?.includes(search?.toLowerCase() ) || (search?.toLowerCase()  || '')?.includes(name));
          }

          return{
            types: (result || []).slice(0, perPage),
            total: result?.length
          }
        })
      )
    })
  );


  constructor(
    private store: Store,
    public platform: Platform
  ) { }


  //SEARCH
  searchType(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.statusComponent = {perPage:15, search: this.type?.value};
    this.infiniteScroll$.next(this.statusComponent);
    if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false
  }

  // DELETE SEARCH
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.type.reset();
    this.statusComponent = {perPage:15, search: ''};
    this.infiniteScroll$.next(this.statusComponent);
    if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;
  }

  // INIFINITE SCROLL
  loadData(event, total) {
    setTimeout(() => {
      this.statusComponent = {...this.statusComponent, perPage: this.statusComponent.perPage + 15};
      if(this.statusComponent.perPage >= total){
        if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = true
      }
      this.infiniteScroll$.next(this.statusComponent);

      event.target.complete();
    }, 500);
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.statusComponent = {perPage:15, search:''};
      this.infiniteScroll$.next(this.statusComponent);
      this.type.reset();
      if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false

      event.target.complete();
    }, 500);
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
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

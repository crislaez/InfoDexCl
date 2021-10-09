import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent, IonInfiniteScroll, Platform } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { fromPokemon } from 'src/app/shared/pokemon';
import { clearName, defaultImagePokemon, errorImage, getCardrBackground, getPokemonImagePrincipal, getPokemonPokedexNumber, gotToTop, trackById } from '../../shared/shared/utils/utils';


@Component({
  selector: 'app-home',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <!-- HEADER  -->
    <div class="header" no-border>
      <ion-text>
        <h1>{{ 'COMMON.POKEMON' | translate }}</h1>
      </ion-text>
    </div>

    <ng-container *ngIf="info$ | async as info; else loader">
      <ng-container *ngIf="(status$ | async) as status">
        <ng-container *ngIf="status !== 'pending'; else loader">
          <ng-container *ngIf="status !== 'error'; else serverError">

            <!-- BUSCADOR  -->
            <form (submit)="searchPokemon($event)" class="fade-in-card">
              <ion-searchbar color="light" [placeholder]="'COMMON.POKEMON_SPREAT' | translate" [formControl]="pokemon" (ionClear)="clearSearch($event)"></ion-searchbar>
            </form>

            <!-- POKEMON LIST  -->
            <ng-container *ngIf="info?.pokemons?.length > 0; else noPokemons">

              <ion-card class="ion-activatable ripple-parent fade-in-image" *ngFor="let pokemon of info?.pokemons; let i = index; trackBy: trackById" [routerLink]="['/pokemon/'+ getPokemonPokedexNumber(pokemon?.url)]" >
                <ion-card-content class="pokemon-item" [ngClass]="getCardrBackground(i)">
                  <ion-label class="capital-letter span-white">#{{getPokemonPokedexNumber(pokemon?.url)}}  {{clearName(pokemon?.name)}}</ion-label>
                  <ion-avatar slot="start">
                    <img loading="lazy" [src]="getPokemonImagePrincipal(pokemon?.url)" [alt]="getPokemonImagePrincipal(pokemon?.url)" (error)="errorImage($event,  defaultImagePokemon(pokemon?.url))">
                  </ion-avatar>
                </ion-card-content>

                <ion-ripple-effect></ion-ripple-effect>
              </ion-card>

              <!-- INFINITE SCROLL  -->
              <ng-container *ngIf="info?.total as total">
                <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event, total)">
                  <ion-infinite-scroll-content color="primary" class="loadingspinner">
                  </ion-infinite-scroll-content>
                </ion-infinite-scroll>
              </ng-container>
            </ng-container>

          </ng-container>
        </ng-container>
      </ng-container>
    </ng-container>

     <!-- REFRESH -->
     <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)" >
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <!-- IS ERROR -->
    <ng-template #serverError>
      <div class="error-serve">
        <div>
          <span><ion-icon class="text-second-color big-size" name="cloud-offline-outline"></ion-icon></span>
          <br>
          <span class="text-second-color">{{ 'COMMON.ERROR' | translate }}</span>
        </div>
      </div>
    </ng-template>

    <!-- IS NO POKEMONS  -->
    <ng-template #noPokemons>
      <div class="error-serve">
        <span >No search pokemon</span>
      </div>
    </ng-template>

    <!-- LOADER  -->
    <ng-template #loader>
      <ion-spinner color="primary"></ion-spinner>
    </ng-template>

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>

  </ion-content>
  `  ,
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage  {

  getPokemonImagePrincipal = getPokemonImagePrincipal;
  defaultImagePokemon = defaultImagePokemon;
  getPokemonPokedexNumber = getPokemonPokedexNumber;
  getCardrBackground = getCardrBackground;
  clearName = clearName;
  trackById = trackById;
  errorImage = errorImage;
  gotToTop = gotToTop;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, {static: true}) content: IonContent;

  showButton: boolean = false;
  statusComponent:{perPage:number, search:string} = {
    perPage:15,
    search:''
  };

  pokemon = new FormControl('');
  infiniteScroll$ = new EventEmitter<{perPage:number, search:string}>();
  status$ = this.store.pipe(select(fromPokemon.getStatus));

  info$: Observable<any> = this.infiniteScroll$.pipe(
    startWith(this.statusComponent),
    switchMap(({perPage, search}) => {
      return this.store.select(fromPokemon.getPokemons).pipe(
        map(pokemons => {
          let result = [...pokemons];

          if(!!search){
            result = (pokemons || []).filter(({name}) => name === search?.toLowerCase() || name?.includes(search?.toLowerCase() ) || (search?.toLowerCase()  || '')?.includes(name));
          }

          return {
            pokemons: (result || [])?.slice(0, perPage),
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
  searchPokemon(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.statusComponent = {perPage:15, search: this.pokemon?.value};
    this.infiniteScroll$.next(this.statusComponent);
    if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false
  }

  // DELETE SEARCH
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.pokemon.reset();
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
      this.pokemon.reset();
      if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false

      event.target.complete();
    }, 500);
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }


}

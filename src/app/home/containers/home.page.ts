import { Component, ChangeDetectionStrategy, EventEmitter, ViewChild } from '@angular/core';
import { fromPokemon } from 'src/app/shared/pokemon';
import { Store, select} from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs'
import { map, startWith, switchMap, tap } from 'rxjs/operators'
import { FormControl } from '@angular/forms';
import { getPokemonImagePrincipal, defaultImagePokemon, getPokemonPokedexNumber, clearName, getCardrBackground, trackById, errorImage, gotToTop} from '../../shared/shared/utils/utils';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <!-- HEADER  -->
    <div class="header" no-border>
      <ion-text>
        <h1>Pokémon</h1>
      </ion-text>
    </div>

    <ng-container *ngIf="info$ | async as info; else loader">
      <ng-container *ngIf="!(pending$ | async); else loader">

        <!-- BUSCADOR  -->
        <form (submit)="searchPokemon($event)" class="fade-in-card">
          <ion-searchbar color="light" placeholder="pokemon..." [formControl]="pokemon" (ionClear)="clearSearch($event)"></ion-searchbar>
        </form>

        <!-- POKEMON LIST  -->
        <ng-container *ngIf="!loading; else loader">
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
                <ion-infinite-scroll-content loadingSpinner="crescent" color="primary" class="loadingspinner">
                </ion-infinite-scroll-content>
              </ion-infinite-scroll>
            </ng-container>

          </ng-container>
        </ng-container>

      </ng-container>
    </ng-container>

     <!-- REFRESH -->
     <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)" >
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <!-- IS NO POKEMONS  -->
    <ng-template #noPokemons>
      <div class="error-serve">
        <span >No search pokemon</span>
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
  loading = false;
  perPage: number = 15;
  showButton: boolean = false;

  pokemon = new FormControl('');
  infiniteScroll$ = new EventEmitter();
  searchResult$ = new EventEmitter();
  pending$: Observable<boolean> = this.store.pipe(select(fromPokemon.getPending));

  info$: Observable<any> = combineLatest([
    this.searchResult$.pipe(startWith('')),
    this.infiniteScroll$.pipe(startWith(15)),
  ]).pipe(
    tap(() => this.loading = true),
    switchMap(([result, page]) => {
      if(!!result){
        return this.store.pipe(select(fromPokemon.getPokemons),
          map(pokemons => {
            let filterPokemon = (pokemons || []).filter((pokemon: any) =>  pokemon?.name === result?.toLowerCase() || pokemon?.name.includes(result?.toLowerCase()));
            return {
              pokemons: (filterPokemon|| []).slice(0, page),
              total:filterPokemon?.length
            }
          })
        )
      }else{
        return this.store.pipe(select(fromPokemon.getPokemons),
          map((pokemons) => {
            return{
              pokemons: (pokemons || []).slice(0, page),
              total:pokemons?.length
            }
          })
        )
      }
    }),
    tap(() => this.loading = false)
  );


  constructor(private store: Store, public platform: Platform) {
    // this.info$.subscribe(data => console.log(data?.pokemons))
  }


  //SEARCH
  searchPokemon(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.searchResult$.next(this.pokemon?.value)
    this.clearAll();
  }

  // DELETE SEARCH
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.pokemon.reset();
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
      this.pokemon.reset();
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

}

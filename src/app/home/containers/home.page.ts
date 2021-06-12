import { Component, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { fromPokemon } from 'src/app/shared/pokemon';
import { Store, select} from '@ngrx/store';
import { Observable } from 'rxjs'
import { map, startWith, switchMap, tap } from 'rxjs/operators'
import { FormControl } from '@angular/forms';
import { getPokemonImagePrincipal, defaultImagePokemon, getPokemonPokedexNumber, clearName, getCardrBackground } from '../../shared/shared/utils/utils';


@Component({
  selector: 'app-home',
  template:`
  <ion-content [fullscreen]="true">

    <!-- HEADER  -->
    <div class="header" no-border>
      <ion-text>
        <h1>Pokémon</h1>
      </ion-text>
    </div>

     <!-- REFRESH -->
    <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)" >
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <ng-container *ngIf="pokemons$ | async as pokemons; else loader">
      <ng-container *ngIf="!(pending$ | async); else loader">

      <!-- BUSCADOR  -->
        <form class="form-search" (submit)="searchPokemon($event)">
          <ion-item>
            <ion-input name="name" placeholder="pokemon..." [formControl]="pokemon" ></ion-input>
          </ion-item>
          <ion-button type="submit"><ion-icon  name="search-outline"></ion-icon></ion-button>
        </form>

        <!-- POKEMON LIST  -->
        <ng-container *ngIf="!loading; else loader">
          <ng-container *ngIf="pokemons?.length > 0; else noPokemons">

            <ion-virtual-scroll [items]="pokemons" approxItemHeight="320px">
              <ion-card class="ion-activatable ripple-parent" *virtualItem="let pokemon; let i = index;" [routerLink]="['/pokemon/'+ getPokemonPokedexNumber(pokemon?.url)]" >
                <ion-card-content class="pokemon-item" [ngClass]="getCardrBackground(i)">
                  <ion-label class="capital-letter span-white">#{{getPokemonPokedexNumber(pokemon?.url)}}  {{clearName(pokemon?.name)}}</ion-label>
                  <ion-avatar slot="start">
                    <img loading="lazy" [src]="getPokemonImagePrincipal(pokemon?.url)" [alt]="getPokemonImagePrincipal(pokemon?.url)" (error)="errorImage($event,  defaultImagePokemon(pokemon?.url))">
                  </ion-avatar>
                </ion-card-content>
                <!-- RIPPLE EFFECT -->
                <ion-ripple-effect></ion-ripple-effect>
              </ion-card>
            </ion-virtual-scroll>

          </ng-container>
        </ng-container>

        <!-- IS NO POKEMONS  -->
        <ng-template #noPokemons>
          <div class="error-serve">
            <span >No search pokemon</span>
          </div>
        </ng-template>

      </ng-container>
    </ng-container>

    <!-- LOADER  -->
    <ng-template #loader>
      <ion-spinner name="crescent" color="primary"></ion-spinner>
    </ng-template>
  </ion-content>
  `  ,
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage  {

  loading = false;
  pokemon = new FormControl('');
  pending$: Observable<boolean> = this.store.pipe(select(fromPokemon.getPending))
  searchResult$ = new EventEmitter()
  getPokemonImagePrincipal = getPokemonImagePrincipal;
  defaultImagePokemon = defaultImagePokemon;
  getPokemonPokedexNumber = getPokemonPokedexNumber;
  getCardrBackground = getCardrBackground;
  clearName = clearName;

  pokemons$: Observable<any> = this.searchResult$.pipe(
    startWith(''),
    tap(() => this.loading = true),
    switchMap((result) => {
      if(result){
        return this.store.pipe(select(fromPokemon.getPokemons),
            map(pokemons => pokemons.filter((pokemon: any) =>  pokemon?.name === result?.toLowerCase() || pokemon?.name.includes(result?.toLowerCase()) )),
            tap(() => this.loading = false)
          )
      }else{
        return this.store.pipe(select(fromPokemon.getPokemons),
        tap(() => this.loading = false)
        )
      }
    })
  )

  constructor(private store: Store) {
    // this.pokemons$.subscribe(data => console.log(data))
  }


  errorImage(event, url) {
    event.target.src = url;
  }

  trackById(_: number, item: any): number {
    return item.id;
  }

  searchPokemon(event: Event): void{
    event.preventDefault();
    this.searchResult$.next(this.pokemon?.value)
    this.pokemon.reset();
  }

  loadData(event): void{
    event.target.complete()
  }

  doRefresh(event) {
    setTimeout(() => {
      this.searchResult$.next('')
      event.target.complete();
    }, 500);
  }

}

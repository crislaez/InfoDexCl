import { Component, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { Observable, EMPTY, combineLatest } from 'rxjs';
import { filter, switchMap, tap, catchError, startWith } from 'rxjs/operators';
import { PokemonService } from 'src/app/shared/pokemon';
import { getPokemonImagePrincipal, getPokemonPokedexNumber, defaultImagePokemon, isNotData, clearName, trackById } from '../../shared/shared/utils/utils';

@Component({
  selector: 'app-ability',
  template:`
   <ion-content [fullscreen]="true">

    <!-- REFRESH -->
    <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

     <ng-container *ngIf="(ability$ | async) as ability; else loader">
      <ng-container *ngIf="isNotData(ability); else noAbility">
        <div class="container none">

          <!-- HEADER  -->
          <div class="header" no-border>
            <div class="header-container">
              <ion-back-button defaultHref="" class="color-menu" [text]="''"></ion-back-button>
              <h1 class="capital-letter">{{clearName(ability?.name)}}</h1>
              <div class="header-container-empty" ></div>
            </div>
          </div>

          <!-- EFFECT  -->
          <ion-card class="card-stats fade-in-image">
            <ion-card-header class="card-header">
              <h2>Effect</h2>
            </ion-card-header>
           <ion-card-content>
            <div *ngIf="getAbilityEffectEnglish(ability?.effect_entries); else noData">{{getAbilityEffectEnglish(ability?.effect_entries)}}</div>
           </ion-card-content>
          </ion-card>

           <!-- POKEMONS  -->
           <ion-card class="card-stats fade-in-image">
              <ion-card-header class="card-header">
                <h2>Pokemon that learn it</h2>
              </ion-card-header>
              <ion-card-content class="div-accuracy">

                <ng-container *ngIf="ability?.pokemon?.length > 0; else noData">
                  <ion-card class="div-pokemon-learning ion-activatable ripple-parent" *ngFor="let pokemon of ability?.pokemon; trackBy: trackById"  [routerLink]="['/pokemon/'+getPokemonPokedexNumber(pokemon?.pokemon?.url)]" >
                    <ion-card-content class="pokemon-item">
                      <ion-label class="span-complete">#{{getPokemonPokedexNumber(pokemon?.pokemon?.url)}}</ion-label>
                      <ion-label class="span-complete capital-letter">{{clearName(pokemon?.pokemon?.name)}}</ion-label>
                      <ion-avatar slot="start">
                        <img loading="lazy" [src]="getPokemonImagePrincipal(pokemon?.pokemon?.url)" (error)="errorImage($event, defaultImagePokemon(pokemon?.url))">
                      </ion-avatar>
                      <div class="card-stats-div"><span class="span-dark">hide:</span>
                      <span *ngIf="pokemon?.is_hidden === true; else hideAbility">Yes</span>
                        <ng-template #hideAbility>No</ng-template>
                      </div>
                    </ion-card-content>
                    <!-- RIPPLE EFFECT -->
                    <ion-ripple-effect></ion-ripple-effect>
                  </ion-card>
                </ng-container>

              </ion-card-content>
           </ion-card>
        </div>

      </ng-container>
     </ng-container>

     <!-- IS NO DATA  -->
    <ng-template #noData>
      <div class="error-serve">
        <span >No data</span>
      </div>
    </ng-template>

     <!-- IS NO ABILITY  -->
    <ng-template #noAbility>
      <div class="error-serve">
        <span >No ability</span>
      </div>
    </ng-template>

    <!-- LOADER  -->
    <ng-template #loader>
      <ion-spinner ion-spinner name="crescent" color="primary"></ion-spinner>
    </ng-template>

  </ion-content>
  `,
  styleUrls: ['./ability.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbilityPage {

  getPokemonImagePrincipal = getPokemonImagePrincipal;
  getPokemonPokedexNumber = getPokemonPokedexNumber;
  defaultImagePokemon = defaultImagePokemon;
  clearName = clearName;
  isNotData = isNotData;
  trackById = trackById;
  reload$ = new EventEmitter();

  ability$: Observable<any> = this.reload$.pipe(
    startWith(''),
    switchMap(() =>
      combineLatest([
        this.route.params
      ]).pipe(
        filter(([{ability}]) => !!ability),
        switchMap(([{ability}]) =>
          this._pokemon.getAbility(ability).pipe(
            catchError((error) => {
              return [{}]
            })
          )
        )
      )
    )
  )


  constructor(private route: ActivatedRoute, private _pokemon: PokemonService, private location: Location) {
    // this.ability$.subscribe(data => console.log(data))
   }


   errorImage(event, url) {
    event.target.src = url;
  }

  getAbilityEffectEnglish(effects: any): string{
    return effects.find(({language: {name}}) => name === 'en')?.effect
  }

  doRefresh(event) {
    setTimeout(() => {
      this.reload$.next('')
      event.target.complete();
    }, 500);
  }


}

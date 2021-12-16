import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AbilityActions, fromAbility } from '@pokemon/shared/ability-m';
import { combineLatest } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { clearName, defaultImagePokemon, getPokemonImagePrincipal, getPokemonPokedexNumber, gotToTop, isNotData, trackById } from '@pokemon/shared/utils/utils/functions';

@Component({
  selector: 'app-ability',
  template:`
   <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

     <ng-container *ngIf="(ability$ | async) as ability">
       <ng-container *ngIf="(status$ | async) as status">
        <ng-container *ngIf="status !== 'pending'; else loader">
          <ng-container *ngIf="status !== 'error'; else serverError">

            <ng-container *ngIf="isNotData(ability); else noAbility">
              <div class="container none">

                <!-- HEADER  -->
                <div class="header" no-border>
                  <div class="header-container">
                    <ion-back-button defaultHref="/ability" class="color-menu" [text]="''"></ion-back-button>
                    <h1 class="capital-letter">{{clearName(ability?.name)}}</h1>
                    <div class="header-container-empty" ></div>
                  </div>
                </div>

                <!-- EFFECT  -->
                <ion-card class="card-stats fade-in-image">
                  <ion-card-header class="card-header">
                    <h2>{{ 'COMMON.EFFECT' | translate }}</h2>
                  </ion-card-header>

                  <ion-card-content>
                    <div *ngIf="getAbilityEffectEnglish(ability?.effect_entries); else noData">{{getAbilityEffectEnglish(ability?.effect_entries)}}</div>
                  </ion-card-content>
                </ion-card>

                <!-- POKEMONS  -->
                <ion-card class="card-stats fade-in-image">
                  <ion-card-header class="card-header">
                    <h2>{{ 'COMMON.LEARN_POKEMON' | translate }}</h2>
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
                          <div class="card-stats-div"><span class="span-dark">{{ 'COMMON.HIDE' | translate }}:</span>
                          <span *ngIf="pokemon?.is_hidden === true; else hideAbility">{{ 'COMMON.YES' | translate }}</span>
                            <ng-template #hideAbility>{{ 'COMMON.NO' | translate }}</ng-template>
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
          <span><ion-icon class="item-color big-size" name="cloud-offline-outline"></ion-icon></span>
          <br>
          <span class="item-color">{{ 'COMMON.ERROR' | translate }}</span>
        </div>
      </div>
    </ng-template>

     <!-- IS NO DATA  -->
    <ng-template #noData>
      <div class="error-serve">
        <span >{{ 'COMMON.NO_DATA' | translate }}</span>
      </div>
    </ng-template>

     <!-- IS NO ABILITY  -->
    <ng-template #noAbility>
      <div class="error-serve">
      <span >{{ 'COMMON.NO_DATA' | translate }}</span>
      </div>
    </ng-template>

    <!-- LOADER  -->
    <ng-template #loader>
      <ion-spinner class="loadingspinner"></ion-spinner>
    </ng-template>

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>

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
  gotToTop = gotToTop;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton: boolean = false;

  reload$ = new EventEmitter();
  status$ = this.store.select(fromAbility.getAbilityStatus);

  ability$ = combineLatest([
    this.route.params,
    this.reload$.pipe(startWith(''))
  ]).pipe(
    tap(([{ability}, reload]) => {
      this.store.dispatch(AbilityActions.loadAbility({abilityyName: ability}))
    }),
    switchMap(() =>
      this.store.select(fromAbility.getAbility)
    )
  );


  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) { }


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

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

}

import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { fromType, TypeActions } from '@pokemon/shared/type-m';
import { clearName, defaultImagePokemon, getPokemonImagePrincipal, getPokemonPokedexNumber, gotToTop, isNotData, trackById } from '@pokemon/shared/utils/utils/functions';
import { combineLatest } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-type',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
    <div class="empty-header"></div>

    <ng-container *ngIf="(type$ | async) as type">
      <ng-container *ngIf="(status$ | async) as status">
        <ng-container *ngIf="status !== 'pending'; else loader">
          <ng-container *ngIf="status !== 'error'; else serverError">

            <ng-container *ngIf="isNotData(type); else noType">
              <div class="empty-header-radius" [ngClass]="getClassColor(type?.name)"></div>

              <div class="container" [ngClass]="getClassColor(type?.name)">

                <!-- HEADER  -->
                <div class="header" no-border>
                  <div class="header-container">
                    <ion-back-button defaultHref="/type" class="color-menu" [text]="''"></ion-back-button>
                    <h1 class="capital-letter">{{type?.name}}</h1>
                    <div class="header-container-empty" ></div>
                  </div>
                </div>

                <!--DOUBLE  DAMAGE FROM -->
                <ion-card class="card-stats fade-in-image">
                  <ion-card-header class="card-header">
                    <h2>{{ 'COMMON.DOUBLE_DAMAGE_FROM' | translate }}</h2>
                  </ion-card-header>
                  <ion-card-content *ngIf="type?.damage_relations?.double_damage_from?.length; else noData" class="div-accuracy">
                    <ion-card class="card-type ion-activatable ripple-parent" *ngFor="let item of type?.damage_relations?.double_damage_from; trackBy: trackById" [routerLink]="['/type/'+getPokemonPokedexNumber(item?.url)]" [ngClass]="getClassColor(item?.name)">
                      <ion-label class="capital-letter">{{item?.name}}</ion-label>
                      <!-- RIPPLE EFFECT -->
                      <ion-ripple-effect></ion-ripple-effect>
                    </ion-card>
                  </ion-card-content>
                </ion-card>

                <!--DOUBLE  DAMAGE TO -->
                <ion-card class="card-stats fade-in-image">
                  <ion-card-header class="card-header">
                    <h2>{{ 'COMMON.DOUBLE_DAMAGE_TO' | translate }}</h2>
                  </ion-card-header>
                  <ion-card-content  *ngIf="type?.damage_relations?.double_damage_to?.length; else noData" class="div-accuracy">
                    <ion-card class="card-type ion-activatable ripple-parent" *ngFor="let item of type?.damage_relations?.double_damage_to; trackBy: trackById" [routerLink]="['/type/'+getPokemonPokedexNumber(item?.url)]" [ngClass]="getClassColor(item?.name)">
                      <ion-label class="capital-letter">{{item?.name}}</ion-label>
                      <!-- RIPPLE EFFECT -->
                      <ion-ripple-effect></ion-ripple-effect>
                    </ion-card>
                  </ion-card-content>
                </ion-card>

                <!--HALF  DAMAGE FROM -->
                <ion-card class="card-stats fade-in-image">
                  <ion-card-header class="card-header">
                    <h2>{{ 'COMMON.HALF_DAMAGE_FROM' | translate }}</h2>
                  </ion-card-header>
                  <ion-card-content *ngIf="type?.damage_relations?.half_damage_from?.length; else noData" class="div-accuracy">
                    <ion-card class="card-type ion-activatable ripple-parent" *ngFor="let item of type?.damage_relations?.half_damage_from; trackBy: trackById" [routerLink]="['/type/'+getPokemonPokedexNumber(item?.url)]" [ngClass]="getClassColor(item?.name)">
                      <ion-label class="capital-letter">{{item?.name}}</ion-label>
                      <!-- RIPPLE EFFECT -->
                      <ion-ripple-effect></ion-ripple-effect>
                    </ion-card>
                  </ion-card-content>
                </ion-card>

                <!--HALF  DAMAGE TO -->
                <ion-card class="card-stats fade-in-image">
                  <ion-card-header class="card-header">
                    <h2>{{ 'COMMON.HALF_DAMAGE_TO' | translate }}</h2>
                  </ion-card-header>
                  <ion-card-content *ngIf="type?.damage_relations?.half_damage_to?.length; else noData" class="div-accuracy">
                    <ion-card class="card-type ion-activatable ripple-parent" *ngFor="let item of type?.damage_relations?.half_damage_to; trackBy: trackById" [routerLink]="['/type/'+getPokemonPokedexNumber(item?.url)]" [ngClass]="getClassColor(item?.name)">
                      <ion-label class="capital-letter">{{item?.name}}</ion-label>
                      <!-- RIPPLE EFFECT -->
                      <ion-ripple-effect></ion-ripple-effect>
                    </ion-card>
                  </ion-card-content>
                </ion-card>

                <!--NO  DAMAGE FROM -->
                <ion-card class="card-stats fade-in-image">
                  <ion-card-header class="card-header">
                    <h2>{{ 'COMMON.NO_DAMAGE_FROM' | translate }}</h2>
                  </ion-card-header>
                  <ion-card-content *ngIf="type?.damage_relations?.no_damage_from?.length; else noData" class="div-accuracy">
                    <ion-card class="card-type ion-activatable ripple-parent" *ngFor="let item of type?.damage_relations?.no_damage_from; trackBy: trackById" [routerLink]="['/type/'+getPokemonPokedexNumber(item?.url)]" [ngClass]="getClassColor(item?.name)">
                      <ion-label class="capital-letter">{{item?.name}}</ion-label>
                      <!-- RIPPLE EFFECT -->
                      <ion-ripple-effect></ion-ripple-effect>
                    </ion-card>
                  </ion-card-content>
                </ion-card>

                <!--NO  DAMAGE TO -->
                <ion-card class="card-stats fade-in-image">
                  <ion-card-header class="card-header">
                    <h2>{{ 'COMMON.NO_DAMAGE_TO' | translate }}</h2>
                  </ion-card-header>
                  <ion-card-content *ngIf="type?.damage_relations?.no_damage_to?.length; else noData" class="div-accuracy">
                    <ion-card class="card-type ion-activatable ripple-parent" *ngFor="let item of type?.damage_relations?.no_damage_to; trackBy: trackById" [routerLink]="['/type/'+getPokemonPokedexNumber(item?.url)]" [ngClass]="getClassColor(item?.name)">
                      <ion-label class="capital-letter">{{item?.name}}</ion-label>
                      <!-- RIPPLE EFFECT -->
                      <ion-ripple-effect></ion-ripple-effect>
                    </ion-card>
                  </ion-card-content>
                </ion-card>

                <!-- POKEMON / MOVES -->
                <ion-card class="card-stats fade-in-image">
                  <ion-card-header class="card-header displayed">
                    <ion-button color="primary" class="margin-button" (click)="pokemonOrMove = 1">{{ 'COMMON.POKEMON' | translate }}</ion-button>
                    <ion-button color="primary" class="margin-button" (click)="pokemonOrMove = 2">{{ 'COMMON.MOVE' | translate }}</ion-button>
                    <h2 *ngIf="pokemonOrMove === 1; else allMovesTitle">{{ 'COMMON.LEARN_POKEMON' | translate }}</h2>
                    <ng-template #allMovesTitle>
                      <h2>{{ 'COMMON.ALL_TYPE_MOVES' | translate }}</h2>
                    </ng-template>
                  </ion-card-header>
                  <ion-card-content class="div-accuracy">
                    <!-- LEARNING BY POKEMON  -->
                    <ng-container *ngIf="pokemonOrMove === 1; else allMoves">
                      <ion-card class="div-pokemon-learning ion-activatable ripple-parent" *ngFor="let pokemon of type?.pokemon; trackBy: trackById" [routerLink]="['/pokemon/'+getPokemonPokedexNumber(pokemon?.pokemon?.url)]" >
                        <ion-card-content class="pokemon-item">
                          <ion-label class="span-complete">#{{getPokemonPokedexNumber(pokemon?.pokemon?.url)}}</ion-label>
                          <ion-label class="span-complete capital-letter">{{clearName(pokemon?.pokemon?.name)}}</ion-label>
                          <ion-avatar slot="start">
                            <img loading="lazy" [src]="getPokemonImagePrincipal(pokemon?.pokemon?.url)" [alt]="getPokemonImagePrincipal(pokemon?.pokemon?.url)" (error)="errorImage($event, defaultImagePokemon(pokemon?.pokemon?.url))">
                          </ion-avatar>
                        </ion-card-content>
                        <!-- RIPPLE EFFECT -->
                      <ion-ripple-effect></ion-ripple-effect>
                      </ion-card>
                    </ng-container>
                    <!-- ALL MOVES  -->
                    <ng-template #allMoves>
                      <ion-card class="card-type div-min-height middle-width move ion-activatable ripple-parent" *ngFor="let item of type?.moves; trackBy: trackById" [routerLink]="['/move/'+getPokemonPokedexNumber(item?.url)]" [ngClass]="getClassColor(item?.name)">
                        <ion-label class="capital-letter">{{clearName(item?.name)}}</ion-label>
                        <!-- RIPPLE EFFECT -->
                        <ion-ripple-effect></ion-ripple-effect>
                      </ion-card>
                    </ng-template>

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
        <div class="text-color-dark">
          <span><ion-icon class="text-second-color big-size" name="cloud-offline-outline"></ion-icon></span>
          <br>
          <span class="item-color">{{ 'COMMON.ERROR' | translate }}</span>
        </div>
      </div>
    </ng-template>

    <!-- IS NO DATA  -->
    <ng-template #noData>
      <ion-card-content class="no-data">
        <span >{{ 'COMMON.NO_DATA' | translate }}</span>
      </ion-card-content>
    </ng-template>

    <!-- IS NO MOVE  -->
    <ng-template #noType>
      <div class="error-serve">
        <div class="text-color-dark">
          <span><ion-icon class="max-size" name="clipboard-outline"></ion-icon></span>
          <br>
          <span >{{'COMMON.NO_DATA' | translate}}</span>
        </div>
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
  styleUrls: ['./type.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypePage {

  getPokemonImagePrincipal = getPokemonImagePrincipal;
  getPokemonPokedexNumber = getPokemonPokedexNumber;
  defaultImagePokemon = defaultImagePokemon;
  clearName = clearName;
  isNotData = isNotData;
  trackById = trackById;
  gotToTop = gotToTop;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  pokemonOrMove = 1;
  showButton: boolean = false;

  reload$ = new EventEmitter();
  status$ = this.store.select(fromType.getTypeStatus)

  type$ = combineLatest([
    this.route.params,
    this.reload$.pipe(startWith(''))
  ]).pipe(
    tap(([{type}, reload]) => {
      this.store.dispatch(TypeActions.loadType({typeName: type}))
    }),
    switchMap(() =>
      this.store.select(fromType.getType)
    )
  );


  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {  }


  errorImage(event, url) {
    event.target.src = url;
  }

  getClassColor(type: string): string{
    if(type === 'grass' ) return 'green'
    if(type === 'water') return 'water'
    if(type === 'bug') return 'bug'
    if(type === 'dark') return 'dark'
    if(type === 'dragon') return 'dragon'
    if(type === 'electric') return 'electric'
    if(type === 'fire') return 'fire'
    if(type === 'fighting') return 'fighting'
    if(type === 'fly' || type === 'flying') return 'fly'
    if(type === 'ghost') return 'ghost'
    if(type === 'ground') return 'ground'
    if(type === 'ice') return 'ice'
    if(type === 'normal') return 'normal'
    if(type === 'poison') return 'poison'
    if(type === 'rock') return 'rock'
    if(type === 'steel') return 'steel'
    if(type === 'psychic') return 'psychic'
    if(type === 'fairy') return 'fairy'
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

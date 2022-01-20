import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { fromMove, MoveActions } from '@pokemon/shared/move-m';
import { clearName, defaultImagePokemon, getPokemonImagePrincipal, getPokemonPokedexNumber, gotToTop, isNotData, trackById } from '@pokemon/shared/utils/utils/functions';
import { combineLatest } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-move',
  template:`
    <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
    <div class="empty-header"></div>

      <ng-container *ngIf="(move$ | async) as move">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending'; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">

              <ng-container *ngIf="isNotData(move); else noMove">
                <div class="empty-header-radius" [ngClass]="getClassColor(move?.type?.name)"></div>

                <div class="container" [ngClass]="getClassColor(move?.type?.name)">

                  <!-- HEADER  -->
                  <div class="header" no-border>
                    <div class="header-container">
                      <ion-back-button defaultHref="/move" class="color-menu" [text]="''"></ion-back-button>
                      <h1 class="capital-letter">{{clearName(move?.name)}}</h1>
                      <div class="header-container-empty" ></div>
                    </div>
                  </div>

                  <!-- DATA  -->
                  <ion-card class="card-stats fade-in-image">
                    <ion-card-header class="card-header">
                      <h2>{{ 'COMMON.DATA' | translate }}</h2>
                    </ion-card-header>
                    <ion-card-content class="div-accuracy">
                      <div class="div-accuracy-stats">
                        <div><span class="span-dark">{{ 'COMMON.POWER' | translate }}:</span></div>
                        <div *ngIf="move?.power; else noItem">{{move?.power}}</div>
                      </div>
                      <div class="div-accuracy-stats">
                        <div><span class="span-dark">{{ 'COMMON.TYPE' | translate }}:</span></div>
                        <div class="card-type radius ion-activatable ripple-parent" *ngIf="move?.type?.name; else noItem" [routerLink]="['/type/'+getPokemonPokedexNumber(move?.type?.url)]" [ngClass]="getClassColor(move?.type?.name)">
                          <ion-label class="capital-letter">{{move?.type?.name}}</ion-label>
                          <!-- RIPPLE EFFECT -->
                          <ion-ripple-effect></ion-ripple-effect>
                        </div>
                        <!-- <div *ngIf="move?.type?.name; else noItem" class="capital-letter redirect" [routerLink]="['/type/'+ getPokemonPokedexNumber(move?.type?.url)]">{{move?.type?.name}}</div> -->
                      </div>
                      <div class="div-accuracy-stats">
                        <div><span class="span-dark">{{ 'COMMON.DAMAGE_CLASS' | translate }}:</span></div>
                        <div class="card-type radius" *ngIf="move?.damage_class?.name; else noItem"[ngClass]="getClassColor(move?.damage_class?.name)">
                          <ion-label class="capital-letter">{{move?.damage_class?.name}}</ion-label>
                        </div>
                        <!-- <div class="capital-letter" *ngIf="move?.damage_class?.name; else noItem">{{move?.damage_class?.name}}</div> -->
                      </div>
                      <div class="div-accuracy-stats">
                        <div><span class="span-dark">{{ 'COMMON.PP' | translate }}:</span></div>
                        <div class="capital-letter" *ngIf="move?.pp; else noItem">{{move?.pp}}</div>
                      </div>
                      <div class="div-accuracy-stats">
                        <div><span class="span-dark">{{ 'COMMON.ACCURACY' | translate }}:</span></div>
                        <div class="capital-letter" *ngIf="move?.accuracy; else noItem">{{move?.accuracy}}</div>
                      </div>
                      <div class="div-accuracy-stats">
                        <div><span class="span-dark">{{ 'COMMON.PRIORITY' | translate }}:</span></div>
                        <div class="capital-letter" *ngIf="move?.priority; else noItem">{{move?.priority}}</div>
                      </div>
                      <div class="div-accuracy-stats">
                        <div><span class="span-dark">{{ 'COMMON.EFFECT_CHANCE' | translate }}:</span></div>
                        <div class="capital-letter" *ngIf="move?.effect_chance; else noItem">{{move?.effect_chance}}</div>
                      </div>
                      <div *ngIf="move?.stat_changes?.length > 0" class="div-accuracy-stats" >
                        <div><span class="span-dark">Stats change:</span></div>
                        <div class="capital-letter" *ngFor="let stat of move?.stat_changes; trackBy: trackById">{{stat?.stat?.name}}</div>
                      </div>
                    </ion-card-content>
                  </ion-card>

                  <!-- EFFECT  -->
                  <ion-card class="card-stats fade-in-image">
                    <ion-card-header class="card-header">
                      <h2>{{ 'COMMON.EFFECT' | translate }}</h2>
                    </ion-card-header>
                    <ion-card-content *ngIf="move?.effect_entries?.length > 0; else noData">
                      <div class="no-data" *ngFor="let effect of move?.effect_entries; trackBy: trackById">{{effect?.effect}}</div>
                    </ion-card-content>
                  </ion-card>

                  <!-- LEARNING BY POKEMON  -->
                  <ion-card class="card-stats fade-in-image">
                    <ion-card-header class="card-header">
                      <h2>{{ 'COMMON.LEARN_POKEMON' | translate }}</h2>
                    </ion-card-header>

                    <ion-card-content class="div-accuracy">
                      <ion-card class="div-pokemon-learning ion-activatable ripple-parent" *ngFor="let pokemon of move?.learned_by_pokemon; trackBy: trackById" [routerLink]="['/pokemon/'+getPokemonPokedexNumber(pokemon?.url)]" >
                        <ion-card-content class="pokemon-item">
                          <ion-label class="span-complete">#{{getPokemonPokedexNumber(pokemon?.url)}} </ion-label>
                          <ion-label class="span-complete capital-letter">{{clearName(pokemon?.name)}}</ion-label>
                          <ion-avatar slot="start">
                            <img loading="lazy" [src]="getPokemonImagePrincipal(pokemon?.url)" [alt]="getPokemonImagePrincipal(pokemon?.url)" (error)="errorImage($event, defaultImagePokemon(pokemon?.url))">
                          </ion-avatar>
                        </ion-card-content>

                        <!-- RIPPLE EFFECT -->
                        <ion-ripple-effect></ion-ripple-effect>
                      </ion-card>
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
      <ng-template #noItem>
        <div> -</div>
      </ng-template>

      <!-- IS NO DATA  -->
      <ng-template #noData>
        <ion-card-content class="no-data">
          <span class="item-color">{{ 'COMMON.NO_DATA' | translate }}</span>
        </ion-card-content>
      </ng-template>

      <!-- IS NO MOVE  -->
      <ng-template #noMove>
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
  styleUrls: ['./move.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovePage  {

  getPokemonImagePrincipal = getPokemonImagePrincipal;
  getPokemonPokedexNumber = getPokemonPokedexNumber;
  defaultImagePokemon = defaultImagePokemon;
  clearName = clearName;
  isNotData = isNotData;
  trackById = trackById;
  gotToTop = gotToTop
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton: boolean = false;

  reload$ = new EventEmitter();
  status$ = this.store.select(fromMove.getMoveStatus);

  move$ = combineLatest([
    this.route.params,
    this.reload$.pipe(startWith(''))
  ]).pipe(
    tap(([{move}, reload]) => {
      this.store.dispatch(MoveActions.loadMove({moveName: move}))
    }),
    switchMap(() =>
      this.store.select(fromMove.getMove)
    )
  );


  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) { }


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
    if(type === 'physical') return 'physical'
    if(type === 'special') return 'special'
    if(type === 'status') return 'status'
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

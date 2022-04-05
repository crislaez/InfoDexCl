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
    <div class="empty-header"></div>

     <ng-container *ngIf="(ability$ | async) as ability">
       <ng-container *ngIf="(status$ | async) as status">
        <ng-container *ngIf="status !== 'pending'; else loader">
          <ng-container *ngIf="status !== 'error'; else serverError">

            <ng-container *ngIf="isNotData(ability); else noAbility">
              <div class="empty-header-radius none"></div>

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
                <app-pokemons-ability-card
                  [ability]="ability">
                </app-pokemons-ability-card>

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
      <app-no-data [title]="'COMMON.ERROR'" [image]="'assets/images/error.png'" [top]="'20vh'"></app-no-data>
    </ng-template>

     <!-- IS NO DATA  -->
    <ng-template #noData>
      <div class="error-serve">
        <span >{{ 'COMMON.NO_DATA' | translate }}</span>
      </div>
    </ng-template>

     <!-- IS NO ABILITY  -->
    <ng-template #noAbility>
      <app-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'20vh'"></app-no-data>
    </ng-template>

    <!-- LOADER  -->
    <ng-template #loader>
      <app-spinner></app-spinner>
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

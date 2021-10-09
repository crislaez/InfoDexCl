import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent, IonInfiniteScroll, Platform } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { fromAbility } from 'src/app/shared/ability-m';
import { clearName, getCardrBackground, getPokemonImagePrincipal, getPokemonPokedexNumber, gotToTop, isNotData, trackById } from '../../shared/shared/utils/utils';

@Component({
  selector: 'app-abilities',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <!-- HEADER  -->
    <div class="header" no-border>
      <ion-text>
        <h1>{{ 'COMMON.ABILITIES' | translate }}</h1>
      </ion-text>
    </div>

    <ng-container *ngIf="(info$ | async) as info">
      <ng-container *ngIf="(status$ | async) as status">
        <ng-container *ngIf="status !== 'pending'; else loader">
          <ng-container *ngIf="status !== 'error'; else serverError">

            <!-- BUSCADOR  -->
            <form (submit)="searchMove($event)" class="fade-in-card">
              <ion-searchbar color="light" [placeholder]="'COMMON.ABILITY_SPREAT' | translate " [formControl]="ability" (ionClear)="clearSearch($event)"></ion-searchbar>
            </form>

            <!-- ABILITIES LIST  -->
            <ng-container *ngIf="info?.abilities?.length > 0; else noAbilities">
              <ion-card class="ion-activatable ripple-parent fade-in-image" *ngFor="let ability of info?.abilities; let i = index; trackBy: trackById" [routerLink]="['/ability/'+ ability?.name]" [ngClass]="getCardrBackground(i)">
                <ion-card-content class="ability-item">
                  <ion-label class="capital-letter span-white">{{clearName(ability?.name)}}</ion-label>
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
          <span class="text-second-color"> An error has occurred, swipe down to reload </span>
        </div>
      </div>
    </ng-template>

    <!-- IS NO MOVES  -->
    <ng-template #noAbilities>
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
  styleUrls: ['./abilities.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbilitiesPage {

  getPokemonImagePrincipal = getPokemonImagePrincipal;
  getPokemonPokedexNumber = getPokemonPokedexNumber;
  getCardrBackground = getCardrBackground;
  clearName = clearName;
  isNotData = isNotData;
  trackById = trackById;
  gotToTop = gotToTop;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, {static: true}) content: IonContent;

  showButton: boolean = false;
  statusComponent:{perPage:number, search:string} = {
    perPage:15,
    search:''
  };

  ability = new FormControl('');
  infiniteScroll$ = new EventEmitter();
  status$ = this.store.pipe(select(fromAbility.getStatus));

  info$: Observable<any> = this.infiniteScroll$.pipe(
    startWith(this.statusComponent),
    switchMap(({perPage, search}) => {
      return this.store.pipe(select(fromAbility.getAbilities),
        map(abilities => {
          let result = [...abilities];

          if(!!search){
            result = (abilities || []).filter(({name}) => name === search?.toLowerCase() || name?.includes(search?.toLowerCase() ) || (search?.toLowerCase()  || '')?.includes(name));
          }

          return{
            abilities: (result || []).slice(0, perPage),
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
  searchMove(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.statusComponent = {perPage:15, search: this.ability?.value};
    this.infiniteScroll$.next(this.statusComponent);
    if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false
  }

  // DELETE SEARCH
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.ability.reset();
    this.statusComponent = {perPage:15, search: ''};
    this.infiniteScroll$.next(this.statusComponent);
    if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false
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
      this.ability.reset();
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

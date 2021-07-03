import { Component, ChangeDetectionStrategy, EventEmitter, ViewChild } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { tap, startWith, map, switchMap } from 'rxjs/operators';
import { Ability, AbilityActions, fromAbility } from 'src/app/shared/ability-m';
import { getPokemonImagePrincipal, getPokemonPokedexNumber, isNotData, clearName, trackById, getCardrBackground, gotToTop } from '../../shared/shared/utils/utils';
import { select, Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { IonInfiniteScroll } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-abilities',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <!-- HEADER  -->
    <div class="header" no-border>
      <ion-text>
        <h1>Abilities</h1>
      </ion-text>
    </div>

    <ng-container *ngIf="(info$ | async) as info; else loader">

      <!-- BUSCADOR  -->
      <form (submit)="searchMove($event)" class="fade-in-card">
        <ion-searchbar color="light" placeholder="ability..." [formControl]="ability" (ionClear)="clearSearch($event)"></ion-searchbar>
      </form>

      <!-- ABILITIES LIST  -->
      <ng-container *ngIf="!loading; else loader">
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


     <!-- REFRESH -->
     <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <!-- IS NO MOVES  -->
    <ng-template #noAbilities>
      <div class="error-serve">
        <span >No abilities</span>
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
  perPage: number = 15;
  showButton: boolean = false;
  loading = false;

  ability = new FormControl('');
  infiniteScroll$ = new EventEmitter();
  searchResult$ = new EventEmitter()

  info$: Observable<any> = combineLatest([
    this.searchResult$.pipe(startWith('')),
    this.infiniteScroll$.pipe(startWith(15)),
  ]).pipe(
    tap(() => this.loading = true),
    switchMap(([result, page]) =>{
      if(result){
        return this.store.pipe(select(fromAbility.getAbilities),
          map(abilities => {
            const filterAbilities = (abilities || []).filter((ability: any) => ability?.name === result?.toLowerCase() || ability?.name.includes(result?.toLowerCase()));
            return{
              abilities: (filterAbilities || []).slice(0, page),
              total: filterAbilities?.length
            }
          }),
        )
      }else{
        return this.store.pipe(select(fromAbility.getAbilities),
          map(abilities => {
            return{
              abilities:(abilities || []).slice(0, page),
              total:abilities?.length
            }
        })
        )
      }
    }),
    tap(() => this.loading = false)
  );


  constructor(private store: Store, public platform: Platform) {
    // this.info$.subscribe(data => console.log(data?.abilities))
  }


  //SEARCH
  searchMove(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.searchResult$.next(this.ability?.value)
    this.clearAll();
  }

  // DELETE SEARCH
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
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
      this.ability.reset();
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

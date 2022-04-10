import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent, IonInfiniteScroll, Platform } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { getPokemonImagePrincipal, getPokemonPokedexNumber, gotToTop, isNotData, trackById } from '@pokemon/shared/utils/utils/functions';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { fromType } from 'src/app/shared/type-m';

@Component({
  selector: 'app-types',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header">
      <!-- BUSCADOR  -->
      <form *ngIf="!['pending','error']?.includes(status$ | async)" (submit)="searchType($event)" class="fade-in-card">
        <ion-searchbar placeholder="type..." [formControl]="type" (ionClear)="clearSearch($event)"></ion-searchbar>
      </form>
    </div>

    <div class="empty-header-radius"></div>

      <ng-container *ngIf="(info$ | async) as info; else loader">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending'; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">

              <!-- TYPES LIST  -->
              <ng-container *ngIf="info?.types?.length > 0; else noTypes">

                <app-infinite-scroll
                  [items]="info?.types"
                  [total]="info?.total"
                  [status]="status"
                  [route]="'/type/'"
                  [isPokemon]="false"
                  [isType]="true"
                  (loadDataTrigger)="loadData($event)">
                </app-infinite-scroll>

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

      <!-- IS NO TYPES  -->
      <ng-template #noTypes>
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
  styleUrls: ['./types.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypesPage {

  getPokemonImagePrincipal = getPokemonImagePrincipal
  getPokemonPokedexNumber = getPokemonPokedexNumber
  isNotData = isNotData
  trackById = trackById
  gotToTop = gotToTop;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, {static: true}) content: IonContent;

  showButton: boolean = false;
  statusComponent:{perPage:number, search:string} = {
    perPage:15,
    search:''
  };

  type = new FormControl('');
  infiniteScroll$ = new EventEmitter<{perPage:number, search:string}>();
  status$ = this.store.pipe(select(fromType.getStatus)).pipe(shareReplay(1));

  info$: Observable<any> = this.infiniteScroll$.pipe(
    startWith(this.statusComponent),
    switchMap(({perPage, search}) =>{
      return this.store.select(fromType.getTypes).pipe(
        map(types => (types || []).filter(({name}) => name !== 'unknown')),
        map(types => {
          let result = [...types];

          if(!!search){
            result = (types || []).filter(({name}) => name === search?.toLowerCase() || name?.includes(search?.toLowerCase() ) || (search?.toLowerCase()  || '')?.includes(name));
          }

          return{
            types: (result || []).slice(0, perPage),
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
  searchType(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.statusComponent = {perPage:15, search: this.type?.value};
    this.infiniteScroll$.next(this.statusComponent);
    if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false
  }

  // DELETE SEARCH
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.type.reset();
    this.statusComponent = {perPage:15, search: ''};
    this.infiniteScroll$.next(this.statusComponent);
    if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;
  }

  // INIFINITE SCROLL
  loadData({event, total}) {
    this.statusComponent = {...this.statusComponent, perPage: this.statusComponent.perPage + 15};
    if(this.statusComponent.perPage >= total){
      if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = true
    }
    this.infiniteScroll$.next(this.statusComponent);

    event.target.complete();
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.statusComponent = {perPage:15, search:''};
      this.infiniteScroll$.next(this.statusComponent);
      this.type.reset();
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

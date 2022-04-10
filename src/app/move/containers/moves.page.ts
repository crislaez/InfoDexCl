import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent, IonInfiniteScroll, Platform } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { clearName, getCardrBackground, getPokemonImagePrincipal, getPokemonPokedexNumber, gotToTop, isNotData, trackById } from '@pokemon/shared/utils/utils/functions';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { fromMove } from 'src/app/shared/move-m';


@Component({
  selector: 'app-moves',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
    <div class="empty-header">
      <!-- BUSCADOR  -->
      <form *ngIf="!['pending','error']?.includes(status$ | async)" (submit)="searchMove($event)" class="fade-in-card">
        <ion-searchbar placeholder="move..." [formControl]="move" (ionClear)="clearSearch($event)"></ion-searchbar>
      </form>
    </div>

    <div class="empty-header-radius"></div>

    <ng-container *ngIf="(info$ | async) as info">
      <ng-container *ngIf="(status$ | async) as status">
        <ng-container *ngIf="status !== 'pending'; else loader">
          <ng-container *ngIf="status !== 'error'; else serverError">

              <!-- MOVES LIST  -->
              <ng-container *ngIf="info?.moves?.length > 0; else noMoves">

                <app-infinite-scroll
                  [items]="info?.moves"
                  [total]="info?.total"
                  [status]="status"
                  [route]="'/move/'"
                  [isPokemon]="false"
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

    <!-- IS NO MOVES  -->
    <ng-template #noMoves>
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
  styleUrls: ['./moves.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovesPage {

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

  move = new FormControl('');
  infiniteScroll$ = new EventEmitter<{perPage:number, search:string}>();
  status$ = this.store.pipe(select(fromMove.getStatus)).pipe(shareReplay(1));

  info$: Observable<any> = this.infiniteScroll$.pipe(
    startWith(this.statusComponent),
    switchMap(({perPage, search}) => {
      return this.store.pipe(select(fromMove.getMoves),
        map(moves => {
          let result = [...moves];

          if(!!search){
            result = (moves || []).filter(({name}) => name === search?.toLowerCase() || name?.includes(search?.toLowerCase() ) || (search?.toLowerCase()  || '')?.includes(name));
          }

          return {
            moves: (result || []).slice(0, perPage),
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
    this.statusComponent = {perPage:15, search: this.move?.value};
    this.infiniteScroll$.next(this.statusComponent);
    if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false
  }

  // DELETE SEARCH
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.move.reset();
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
      this.move.reset();
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

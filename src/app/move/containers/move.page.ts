import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { fromMove, MoveActions } from '@pokemon/shared/move-m';
import { clearName, defaultImagePokemon, getClassColor, getPokemonPokedexNumber, gotToTop, isNotData, trackById } from '@pokemon/shared/utils/utils/functions';
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
                  <app-move-features
                    [move]="move">
                  </app-move-features>

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
                  <app-pokemon-move-card
                    [move]="move">
                  </app-pokemon-move-card>

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
        <app-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'20vh'"></app-no-data>
      </ng-template>

      <!-- IS NO DATA  -->
      <ng-template #noData>
        <ion-card-content class="no-data">
          <span class="item-color">{{ 'COMMON.NO_DATA' | translate }}</span>
        </ion-card-content>
      </ng-template>

      <!-- IS NO MOVE  -->
      <ng-template #noMove>
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
  styleUrls: ['./move.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovePage  {

  getPokemonPokedexNumber = getPokemonPokedexNumber;
  defaultImagePokemon = defaultImagePokemon;
  getClassColor = getClassColor;
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

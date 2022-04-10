import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { fromType, TypeActions } from '@pokemon/shared/type-m';
import { gotToTop, isNotData, getTypeClassColor } from '@pokemon/shared/utils/utils/functions';
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
              <div class="empty-header-radius" [ngClass]="getTypeClassColor(type?.name)"></div>

              <div class="container" [ngClass]="getTypeClassColor(type?.name)">

                <!-- HEADER  -->
                <div class="header" no-border>
                  <div class="header-container">
                    <ion-back-button defaultHref="/type" class="color-menu" [text]="''"></ion-back-button>
                    <h1 class="capital-letter">{{type?.name}}</h1>
                    <div class="header-container-empty" ></div>
                  </div>
                </div>

                <!--DOUBLE DAMAGE FROM -->
                <app-type-card
                  [title]="'COMMON.DOUBLE_DAMAGE_FROM'"
                  [items]="type?.damage_relations?.double_damage_from">
                </app-type-card>

                <!--DOUBLE DAMAGE TO -->
                <app-type-card
                  [title]="'COMMON.DOUBLE_DAMAGE_TO'"
                  [items]="type?.damage_relations?.double_damage_to">
                </app-type-card>

                <!--HALF DAMAGE FROM -->
                <app-type-card
                  [title]="'COMMON.HALF_DAMAGE_FROM'"
                  [items]="type?.damage_relations?.half_damage_from">
                </app-type-card>

                <!--HALF DAMAGE TO -->
                <app-type-card
                  [title]="'COMMON.HALF_DAMAGE_TO'"
                  [items]="type?.damage_relations?.half_damage_to">
                </app-type-card>

                <!--NO DAMAGE FROM -->
                <app-type-card
                  [title]="'COMMON.NO_DAMAGE_FROM'"
                  [items]="type?.damage_relations?.no_damage_from">
                </app-type-card>

                <!--NO DAMAGE TO -->
                <app-type-card
                  [title]="'COMMON.NO_DAMAGE_TO'"
                  [items]="type?.damage_relations?.no_damage_to">
                </app-type-card>

                <!-- POKEMON / MOVES -->
                <app-pokemons-type-card
                  [pokemonOrMove]="pokemonOrMove"
                  [type]="type">
                </app-pokemons-type-card>

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

    <!-- IS NO MOVE  -->
    <ng-template #noType>
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
  styleUrls: ['./type.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypePage {

  getTypeClassColor = getTypeClassColor;
  isNotData = isNotData;
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


  errorImage(event) {
    event.target.src = '../../../assets/images/notFound.png';
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

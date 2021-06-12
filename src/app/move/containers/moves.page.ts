import { Component, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, switchMap, tap, map } from 'rxjs/operators';
import { getPokemonImagePrincipal, getPokemonPokedexNumber, isNotData, clearName, trackById, getCardrBackground } from '../../shared/shared/utils/utils';
import { select, Store } from '@ngrx/store';
import { fromMove, MoveActions, Move } from 'src/app/shared/move-m';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-moves',
  template: `
  <ion-content [fullscreen]="true">

     <!-- HEADER  -->
    <div class="header" no-border>
      <ion-text>
        <h1>Moves</h1>
      </ion-text>
    </div>

     <!-- REFRESH -->
   <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <ng-container *ngIf="(moves$ | async) as moves; else loader">
      <!-- BUSCADOR  -->
      <form class="form-search" (submit)="searchMove($event)">
        <ion-item>
          <ion-input name="name" placeholder="move..." [formControl]="move" ></ion-input>
        </ion-item>
        <ion-button type="submit"><ion-icon  name="search-outline"></ion-icon></ion-button>
      </form>

      <!-- MOVES LIST  -->
      <ng-container *ngIf="!loading; else loader">
        <ng-container *ngIf="moves?.length > 0; else noMoves">

          <ion-virtual-scroll [items]="moves" approxItemHeight="320px" >
            <ion-card class="ion-activatable ripple-parent" *virtualItem="let moves; let i = index;" [routerLink]="['/move/'+ moves?.name]" [ngClass]="getCardrBackground(i)" >
              <ion-card-content class="move-item">
                <ion-label class="capital-letter span-white">{{clearName(moves?.name)}}</ion-label>
              </ion-card-content>
              <!-- RIPPLE EFFECT -->
              <ion-ripple-effect></ion-ripple-effect>
            </ion-card>
          </ion-virtual-scroll>

        </ng-container>
      </ng-container>

    </ng-container>


    <!-- IS NO MOVES  -->
    <ng-template #noMoves>
      <div class="error-serve">
        <span >No moves</span>
      </div>
    </ng-template>

    <!-- LOADER  -->
    <ng-template #loader>
      <ion-spinner name="crescent" color="primary"></ion-spinner>
    </ng-template>
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

  loading = false;
  move = new FormControl('');
  searchResult$ = new EventEmitter();

  moves$: Observable<Move[]> = this.searchResult$.pipe(
    startWith(''),
    tap(() => this.loading = true),
    switchMap((result) =>{
      if(result){
        return this.store.pipe(select(fromMove.getMoves),
          map(moves => moves.filter((move: any) => move?.name === result?.toLowerCase() || move?.name.includes(result?.toLowerCase()))),
          tap(() => this.loading = false)
        )
      }else{
        return this.store.pipe(select(fromMove.getMoves),
        tap(() => this.loading = false)
        )
      }
    })
  )


  constructor(private store: Store) {
    // this.moves$.subscribe(data => console.log(data))
  }


  searchMove(event: Event): void{
    event.preventDefault();
    this.searchResult$.next(this.move?.value)
    this.move.reset();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.searchResult$.next('')
      event.target.complete();
    }, 500);
  }




}

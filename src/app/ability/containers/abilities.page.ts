import { Component, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, startWith, map, switchMap } from 'rxjs/operators';
import { Ability, AbilityActions, fromAbility } from 'src/app/shared/ability-m';
import { getPokemonImagePrincipal, getPokemonPokedexNumber, isNotData, clearName, trackById, getCardrBackground } from '../../shared/shared/utils/utils';
import { select, Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-abilities',
  template: `
  <ion-content [fullscreen]="true">

    <!-- HEADER  -->
    <div class="header" no-border>
      <ion-text>
        <h1>Abilities</h1>
      </ion-text>
    </div>

    <!-- REFRESH -->
    <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <ng-container *ngIf="(abilities$ | async) as abilities; else loader">
      <!-- BUSCADOR  -->
      <form class="form-search" (submit)="searchMove($event)">
        <ion-item>
          <ion-input name="name" placeholder="ability..." [formControl]="ability" ></ion-input>
        </ion-item>
        <ion-button type="submit"><ion-icon  name="search-outline"></ion-icon></ion-button>
      </form>

      <!-- ABILITIES LIST  -->
      <ng-container *ngIf="!loading; else loader">
        <ng-container *ngIf="abilities?.length > 0; else noAbilities">

          <ion-virtual-scroll [items]="abilities" approxItemHeight="320px">
            <ion-card class="ion-activatable ripple-parent" *virtualItem="let ability; let i = index;" [routerLink]="['/ability/'+ ability?.name]" [ngClass]="getCardrBackground(i)">
              <ion-card-content class="ability-item">
                <ion-label class="capital-letter span-white">{{clearName(ability?.name)}}</ion-label>
              </ion-card-content>
              <!-- RIPPLE EFFECT -->
              <ion-ripple-effect></ion-ripple-effect>
            </ion-card>
          </ion-virtual-scroll>

        </ng-container>
      </ng-container>

    </ng-container>

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

  loading = false;
  ability = new FormControl('');
  searchResult$ = new EventEmitter()

  abilities$: Observable<Ability[]> = this.searchResult$.pipe(
    startWith(''),
    tap(() => this.loading = true),
    switchMap((result) =>{
      if(result){
        return this.store.pipe(select(fromAbility.getAbilities),
          map(abilities => abilities.filter((ability: any) => ability?.name === result?.toLowerCase() || ability?.name.includes(result?.toLowerCase()))),
          tap(() => this.loading = false)
        )
      }else{
        return this.store.pipe(select(fromAbility.getAbilities),
        tap(() => this.loading = false)
        )
      }
    })
  )


  constructor(private store: Store) {
    // this.abilities$.subscribe(data => console.log(data))
  }


  searchMove(event: Event): void{
    event.preventDefault();
    this.searchResult$.next(this.ability?.value)
    this.ability.reset();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.searchResult$.next('')
      event.target.complete();
    }, 500);
  }



}

import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { clearName, defaultImagePokemon, getPokemonImagePrincipal, getPokemonPokedexNumber, gotToTop, isNotData, trackById } from '@pokemon/shared/utils/utils/functions';
import { combineLatest } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { fromPokemon, PokemonActions } from 'src/app/shared/pokemon';

@Component({
  selector: 'app-pokemon',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header"></div>

    <ng-container *ngIf="(pokemon$ | async) as pokemon">
      <ng-container *ngIf="(status$ | async) as status">
        <ng-container *ngIf="status !== 'pending'; else loader">
          <ng-container *ngIf="status !== 'error'; else serverError">

            <ng-container *ngIf="isNotData(pokemon); else noPokemon">
              <div class="empty-header-radius" [ngClass]="getClassColor(pokemon, '')"></div>

              <div class="container" [ngClass]="getClassColor(pokemon, '')">

                <!-- HEADER  -->
                <div class="header" no-border>
                  <div class="header-container">
                    <ion-back-button defaultHref="/home" class="color-menu" [text]="''"></ion-back-button>
                    <h1 class="capital-letter">{{clearName(pokemon?.name)}}</h1>
                    <div class="header-container-empty" ></div>
                    <ng-container *ngIf="pokemon?.types">
                      <h2>{{ 'COMMON.TYPE' | translate}}</h2>
                      <ion-card class="card-type ion-activatable ripple-parent" *ngFor="let type of pokemon?.types; trackBy: trackById" [routerLink]="['/type/'+getPokemonPokedexNumber(type?.type?.url)]" [ngStyle]="{'box-shadow':type?.type?.name=== 'dark' ? '0px 0px 10px white' : '0px 0px 10px gray' }" [ngClass]="getClassColor(null, type?.type?.name)">
                        <ion-label class="capital-letter">{{ type?.type?.name }}</ion-label>
                        <!-- RIPPLE EFFECT -->
                        <ion-ripple-effect></ion-ripple-effect>
                      </ion-card>
                    </ng-container>
                  </div>
                </div>

                <!-- IMAGES  -->
                <ion-avatar class="fade-in-image">
                  <img [src]="getPokemonImage(pokemon)" [alt]="getPokemonImage(pokemon)" (error)="errorImage($event)"/>
                </ion-avatar>

                <!-- BASE EXPERIENCES  -->
                <ion-card class="card-stats fade-in-image">
                  <ion-card-header class="card-header">
                    <h2>{{ 'COMMON.DESCRIPTION' | translate}}</h2>
                  </ion-card-header>
                  <ion-card-content >
                    <div>{{pokemon?.flavor_text_entries}}</div>
                  </ion-card-content>
                </ion-card>

                <!-- CHAIN EVOLUTION  -->
                <app-evolution-chain-card
                  [pokemon]="pokemon">
                </app-evolution-chain-card>

                <!-- ALTERNATIVE FORM  -->
                <app-alternatives-form-card
                  [pokemon]="pokemon">
                </app-alternatives-form-card>

                <!-- STATS  -->
                <app-stats-card
                  [pokemon]="pokemon">
                </app-stats-card>

                <!-- BASE EXPERIENCES  -->
                <app-base-experience-card
                  [pokemon]="pokemon">
                </app-base-experience-card>

                <!-- ABILITIES  -->
                <app-abilities-card
                  [pokemon]="pokemon">
                </app-abilities-card>

                <!-- ENCOUNTERS  -->
                <ion-card class="card-stats fade-in-image" *ngIf="pokemon?.encounters?.length > 0">
                  <ion-card-header class="card-header">
                    <h2>{{ 'COMMON.ENCOUNTERS' | translate}}</h2>
                  </ion-card-header>
                  <ng-container *ngFor="let encounter of pokemon?.encounters; trackBy: trackById" >
                    <div class="card-stats-div span-dark capital-letter">{{clearName(encounter?.location_area?.name)}}:</div>
                    <div class="card-stats-div"><span class="capital-letter" *ngFor="let version of encounter?.version_details">{{version?.version?.name}} </span></div>
                  </ng-container>
                </ion-card>

                <!-- MOVES -->
                <app-moves-card
                  [pokemon]="pokemon">
                </app-moves-card>

                <!-- IMAGES  -->
                <div class="card-header">
                  <h2>{{ 'COMMON.GENERATIONS_SPRITES' | translate}}</h2>
                </div>

                <!-- GENERATIONS IMAGE -->
                <app-generations-images-card
                  [pokemon]="pokemon">
                </app-generations-images-card>

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
      <app-no-data [title]="'COMMON.ERROR'" [image]="'assets/images/error.png'" [top]="'0vh'"></app-no-data>
    </ng-template>

    <!-- IS NO POKEMONS  -->
    <ng-template #noPokemon>
      <app-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'0vh'"></app-no-data>
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
  styleUrls: ['./pokemon.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonPage {

  getPokemonImagePrincipal = getPokemonImagePrincipal;
  getPokemonPokedexNumber = getPokemonPokedexNumber;
  defaultImagePokemon = defaultImagePokemon;
  clearName = clearName;
  isNotData = isNotData;
  trackById = trackById;
  gotToTop = gotToTop;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  notFoundImage: string = '../../../assets/images/notFound.png';
  showButton: boolean = false;

  reload$ = new EventEmitter();
  status$ = this.store.select(fromPokemon.getPokemonStatus);

  pokemon$ = combineLatest([
    this.route.params,
    this.reload$.pipe(startWith(''))
  ]).pipe(
    tap(([{name}, reload]) => {
      this.store.dispatch(PokemonActions.loadPokemon({pokemonName: name}))
    }),
    switchMap(() =>
      this.store.select(fromPokemon.getPokemon)
    )
  );


  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) { }


  errorImage(event) {
    event.target.src = '../../../assets/images/notFound.png';
  }

  getImage(image: string): string{
     if(image) return image
     else return this.notFoundImage
  }

  getKeysImages(pokemon): any{
    return Object.keys(pokemon?.sprites).filter((item) =>
    item === 'back_default' || item === 'back_female' ||item === 'back_shiny' ||item === 'back_shiny_female' ||
    item === 'front_default' || item === 'front_female' ||item === 'front_shiny' ||item === 'front_shiny_female'
    ) || []
  }

  getClassColor(pokemon: any, type: string): string{
    if(this.getPokemonType(pokemon) === 'grass' || type === 'grass' ) return 'green'
    if(this.getPokemonType(pokemon) === 'water' || type === 'water') return 'water'
    if(this.getPokemonType(pokemon) === 'bug' || type === 'bug') return 'bug'
    if(this.getPokemonType(pokemon) === 'dark' || type === 'dark') return 'dark'
    if(this.getPokemonType(pokemon) === 'dragon' || type === 'dragon') return 'dragon'
    if(this.getPokemonType(pokemon) === 'electric' || type === 'electric') return 'electric'
    if(this.getPokemonType(pokemon) === 'fire' || type === 'fire') return 'fire'
    if(this.getPokemonType(pokemon) === 'fighting' || type === 'fighting') return 'fighting'
    if(this.getPokemonType(pokemon) === 'fly' || this.getPokemonType(pokemon) === 'flying' || type === 'fly' || type === 'flying') return 'fly'
    if(this.getPokemonType(pokemon) === 'ghost' || type === 'ghost') return 'ghost'
    if(this.getPokemonType(pokemon) === 'ground' || type === 'ground') return 'ground'
    if(this.getPokemonType(pokemon) === 'ice' || type === 'ice') return 'ice'
    if(this.getPokemonType(pokemon) === 'normal' || type === 'normal') return 'normal'
    if(this.getPokemonType(pokemon) === 'poison' || type === 'poison') return 'poison'
    if(this.getPokemonType(pokemon) === 'rock' || type === 'rock') return 'rock'
    if(this.getPokemonType(pokemon) === 'steel' || type === 'steel') return 'steel'
    if(this.getPokemonType(pokemon) === 'psychic' || type === 'psychic') return 'psychic'
    if(this.getPokemonType(pokemon) === 'fairy' || type === 'fairy') return 'fairy'
  }

  getPokemonType(pokemon: any): string {
    return pokemon?.types?.[0]?.type?.name
  }

  getPokemonImage(pokemon: any): string{
    return pokemon?.sprites?.other?.['official-artwork']?.front_default
  }

  // REFRESH
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

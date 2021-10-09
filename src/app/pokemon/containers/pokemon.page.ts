import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { fromPokemon, PokemonActions } from 'src/app/shared/pokemon';
import { clearName, defaultImagePokemon, getPokemonImagePrincipal, getPokemonPokedexNumber, gotToTop, isNotData, trackById } from '../../shared/shared/utils/utils';

@Component({
  selector: 'app-pokemon',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <ng-container *ngIf="(pokemon$ | async) as pokemon">
      <ng-container *ngIf="(status$ | async) as status">
        <ng-container *ngIf="status !== 'pending'; else loader">
          <ng-container *ngIf="status !== 'error'; else serverError">

            <ng-container *ngIf="isNotData(pokemon); else noPokemon">
              <div class="container" [ngClass]="getClassColor(pokemon, '')">

                <!-- HEADER  -->
                <div class="header" no-border>
                  <div class="header-container">
                    <ion-back-button defaultHref="/home" class="color-menu" [text]="''"></ion-back-button>
                    <h1 class="capital-letter">{{clearName(pokemon?.name)}}</h1>
                    <div class="header-container-empty" ></div>
                    <ng-container *ngIf="pokemon?.types">
                      <h2>{{ 'COMMON.TYPE' | translate}}</h2>
                      <ion-card class="card-type card-shadow ion-activatable ripple-parent" *ngFor="let type of pokemon?.types; trackBy: trackById" [routerLink]="['/type/'+getPokemonPokedexNumber(type?.type?.url)]" [ngClass]="getClassColor(null, type?.type?.name)">
                        <ion-label class="capital-letter">{{type?.type?.name}} </ion-label>
                        <!-- RIPPLE EFFECT -->
                        <ion-ripple-effect></ion-ripple-effect>
                      </ion-card>
                    </ng-container>
                  </div>
                </div>

                <!-- IMAGES  -->
                <ion-avatar class="fade-in-image">
                  <img [src]="getPokemonImage(pokemon)" [alt]="getPokemonImage(pokemon)" (error)="errorImage($event, defaultImagePokemon(pokemon?.location_area_encounters))"/>
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
                <ion-card class="card-stats fade-in-image" *ngIf="checkToChainEvolutions(pokemon)">
                  <ion-card-header class="card-header">
                    <h2>{{ 'COMMON.CHAIN_EVOLUTION' | translate}}</h2>
                  </ion-card-header>
                    <ion-card class="pokemon-evolution ion-activatable ripple-parent" *ngFor="let chain of getEvolutionChains(pokemon?.evolutions?.chain); trackBy: trackById" [routerLink]="['/pokemon/'+ getPokemonPokedexNumber(chain?.url)]">
                      <ion-card-content>
                        <ion-avatar slot="start">
                          <img loading="lazy" [src]="getPokemonImagePrincipal(chain?.url)" [alt]="getPokemonImagePrincipal(chain?.url)" (error)="errorImage($event, defaultImagePokemon(chain?.url))">
                        </ion-avatar>
                        <ion-label class="capital-letter span-dark">{{clearName(chain?.species_name)}} </ion-label>
                        <br>
                        <ion-label ><span *ngIf="chain?.trigger_name">{{clearName(chain?.trigger_name)}}</span><span *ngIf="chain?.min_level && chain?.min_level !== 1"> : {{chain?.min_level}}</span> </ion-label>
                      </ion-card-content>
                      <!-- RIPPLE EFFECT -->
                      <ion-ripple-effect></ion-ripple-effect>
                    </ion-card>
                </ion-card>

                <!-- ALTERNATIVE FORm  -->
                <ion-card class="card-stats fade-in-image" *ngIf="checkAlternativesForm(pokemon)">
                  <ion-card-header class="card-header">
                    <h2>{{ 'COMMON.ALTERNATIVES_FORM' | translate}}</h2>
                  </ion-card-header>
                    <ion-card class="pokemon-evolution ion-activatable ripple-parent" *ngFor="let alternativeForm of pokemon?.varieties; trackBy: trackById" [routerLink]="['/pokemon/'+ getPokemonPokedexNumber(alternativeForm?.pokemon?.url)]">
                      <ion-card-content>
                        <ion-avatar slot="start">
                          <img loading="lazy" [src]="getPokemonImagePrincipal(alternativeForm?.pokemon?.url)" [alt]="getPokemonImagePrincipal(alternativeForm?.pokemon?.url)" (error)="errorImage($event, defaultImagePokemon(alternativeForm?.pokemon?.url))">
                        </ion-avatar>
                        <ion-label class="capital-letter">{{clearName(alternativeForm?.pokemon?.name)}} </ion-label>
                      </ion-card-content>
                      <!-- RIPPLE EFFECT -->
                      <ion-ripple-effect></ion-ripple-effect>
                    </ion-card>
                </ion-card>

                <!-- STATS  -->
                <ion-card class="card-stats fade-in-image">
                  <ion-card-header class="card-header">
                    <h2>{{ 'COMMON.STATS' | translate}}</h2>
                  </ion-card-header>
                  <ion-card-content class="card-stats">
                    <ion-button color="primary" class="margin-button" (click)="stastsValue = 1">Base stats</ion-button>
                    <ion-button color="primary" class="margin-button" (click)="stastsValue = 2">Max stats</ion-button>

                    <ng-container *ngFor="let stat of pokemon?.stats; trackBy: trackById">
                      <ng-container *ngIf="stastsValue === 1">
                        <div class="card-stats-div capital-letter"><span class="span-dark">{{stat?.stat?.name}}:</span></div>
                        <div class="card-stats-div">{{stat?.base_stat}}</div>
                      </ng-container>
                      <ng-container *ngIf="stastsValue === 2">
                        <div class="card-stats-div capital-letter"><span class="span-dark">{{stat?.stat?.name}}:</span></div>
                        <div *ngIf="stat?.stat?.name === 'hp'; else noHp" class="card-stats-div">{{maximunsStatsPs(stat?.base_stat)}}</div>
                        <ng-template #noHp>
                          <div class="card-stats-div">{{maximunsStats(stat?.base_stat)}}</div>
                        </ng-template>
                      </ng-container>
                    </ng-container>

                      <div class="card-stats-div capital-letter"><span class="span-dark">Total:</span></div>
                      <div class="card-stats-div">{{totalStats(pokemon?.stats)}}</div>
                  </ion-card-content>
                </ion-card>

                <!-- BASE EXPERIENCES  -->
                <ion-card class="card-stats fade-in-image">
                  <ion-card-header class="card-header">
                    <h2>{{ 'COMMON.INTERESTING_DATA' | translate}}</h2>
                  </ion-card-header>
                  <ng-container >
                    <div class="card-stats-div"><span class="span-dark">{{ 'COMMON.BASE_EXPERIENCE' | translate}}:</span></div>
                    <div class="card-stats-div">{{pokemon?.base_experience}}</div>
                    <div class="card-stats-div"><span class="span-dark">{{ 'COMMON.HEIGHT' | translate}}:</span></div>
                    <div class="card-stats-div">{{meterFormatter(pokemon?.height)}}</div>
                    <div class="card-stats-div"><span class="span-dark">{{ 'COMMON.WEIGHT' | translate}}:</span></div>
                    <div class="card-stats-div">{{klFormatter(pokemon?.weight)}}</div>
                  </ng-container>
                </ion-card>

                <!-- ABILITIES  -->
                <ion-card class="card-stats fade-in-image" *ngIf="pokemon?.abilities?.length > 0">
                  <ion-card-header class="card-header">
                    <h2>{{ 'COMMON.ABILITIES' | translate}}</h2>
                  </ion-card-header>
                  <ng-container *ngFor="let ability of pokemon?.abilities; trackBy: trackById" >
                    <ion-card class="card-type no-margin ability ion-activatable ripple-parent" [routerLink]="['/ability/'+getPokemonPokedexNumber(ability?.ability?.url)]" >
                      <ion-label class="capital-letter">{{clearName(ability?.ability?.name)}} </ion-label>
                      <!-- RIPPLE EFFECT -->
                      <ion-ripple-effect></ion-ripple-effect>
                    </ion-card>
                    <div class="card-stats-div"><span class="span-dark">{{ 'COMMON.HIDE' | translate}}:</span>
                      <span *ngIf="ability?.is_hidden === true; else hideAbility">{{ 'COMMON.YES' | translate}}</span>
                      <ng-template #hideAbility>{{ 'COMMON.NO' | translate}}</ng-template>
                    </div>
                  </ng-container>
                </ion-card>

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
                <ion-card class="card-stats fade-in-image" *ngIf="pokemon?.moves?.length > 0">
                  <ion-card-header class="card-header">
                    <h2>{{ 'COMMON.MOVES' | translate}}</h2>
                  </ion-card-header>
                  <ng-container *ngFor="let move of pokemon?.moves; trackBy: trackById" >

                    <ion-card class="card-type middle move ion-activatable ripple-parent" [routerLink]="['/move/'+getPokemonPokedexNumber(move?.move?.url)]" >
                      <ion-label class="capital-letter">{{clearName(move?.move?.name)}} </ion-label>
                      <!-- RIPPLE EFFECT -->
                      <ion-ripple-effect></ion-ripple-effect>
                    </ion-card>
                    <div class="card-stats-level" *ngFor="let moveAtLevel of move?.version_group_details; trackBy: trackById">
                      <div><span class="span-dark">{{ 'COMMON.LEVEL' | translate}}:</span> {{moveAtLevel?.level_learned_at}}</div>
                      <div><span class="span-dark">{{ 'COMMON.METHOD' | translate}}:</span> {{clearName(moveAtLevel?.move_learn_method?.name)}}</div>
                      <div class="capital-letter"><span class="span-dark">{{ 'COMMON.VERSION' | translate}}:</span> {{clearName(moveAtLevel?.version_group?.name)}}</div>
                    </div>
                    <!-- <ion-item-divider></ion-item-divider> -->
                  </ng-container>
                </ion-card>

                <!-- IMAGES  -->
                <div class="card-header">
                  <h2>{{ 'COMMON.GENERATIONS_SPRITES' | translate}}</h2>
                </div>
                <!-- ion-card -->
                <ng-container *ngFor="let generations of getKeysGenerationsImages(pokemon?.sprites?.versions); trackBy: trackById">
                  <ng-container *ngFor="let generation of getKeysGenerationsImages(getPokemonGenerations(pokemon, generations)); trackBy: trackById">
                    <ion-card class="card-generations-sprite fade-in-image" *ngIf="ifGenerationImage(getPokemonGeneration(pokemon, generations, generation))" >
                      <h3 class="capital-letter">{{generation}}</h3>
                      <img *ngIf="getPokemonGeneration(pokemon, generations, generation)?.back_default as image" class="card-pokemon-image" [src]="image" [alt]="image">
                      <img *ngIf="getPokemonGeneration(pokemon, generations, generation)?.back_female as image" class="card-pokemon-image" [src]="image" [alt]="image">
                      <img *ngIf="getPokemonGeneration(pokemon, generations, generation)?.back_shiny as image" class="card-pokemon-image" [src]="image" [alt]="image">
                      <img *ngIf="getPokemonGeneration(pokemon, generations, generation)?.back_shiny_female as image" class="card-pokemon-image" [src]="image" [alt]="image">
                      <img *ngIf="getPokemonGeneration(pokemon, generations, generation)?.front_default as image" class="card-pokemon-image" [src]="image" [alt]="image">
                      <img *ngIf="getPokemonGeneration(pokemon, generations, generation)?.front_female as image" class="card-pokemon-image" [src]="image" [alt]="image">
                      <img *ngIf="getPokemonGeneration(pokemon, generations, generation)?.front_shiny as image" class="card-pokemon-image" [src]="image" [alt]="image">
                      <img *ngIf="getPokemonGeneration(pokemon, generations, generation)?.front_shiny_female as image" class="card-pokemon-image" [src]="image" [alt]="image">
                    </ion-card>
                  </ng-container>
                </ng-container>

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
      <div class="error-serve">
        <div>
          <span><ion-icon class="item-color big-size" name="cloud-offline-outline"></ion-icon></span>
          <br>
          <span class="item-color">{{ 'COMMON.ERROR' | translate }}</span>
        </div>
      </div>
    </ng-template>

    <!-- IS NO POKEMONS  -->
    <ng-template #noPokemon>
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
  notFoundImage: string = '../../../assets/images/notFound.png'
  stastsValue = 1;
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


  errorImage(event, url) {
      event.target.src = url;
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

  maximunsStats(stast: number): number {
    let result = ((stast * 2 + 99) * 1.1)
    return parseInt(result.toFixed(0)) -1
  }

  maximunsStatsPs(stast: number): number {
    let result = (stast * 2 + 204)
    return parseInt(result.toFixed(0))
  }

  totalStats(stats: any): number{
    return stats?.reduce((acc, el) => acc + el?.base_stat,0 )
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

  getPokemonGenerations(pokemon: any, generations: string ): string {
    return pokemon?.sprites?.versions?.[generations]
  }

  getPokemonGeneration(pokemon: any, generations: string, generation: string ): any {
    return pokemon?.sprites?.versions?.[generations]?.[generation]
  }

  getKeysGenerationsImages(generations): any {
    return Object.keys(generations).filter(item => item !== '__proto__')
  }

  ifGenerationImage(generation: any): boolean{
    if(generation?.back_default || generation?.back_female || generation?.back_shiny || generation?.back_shiny_female ||
    generation?.front_default || generation?.front_female || generation?.front_shiny || generation?.front_shiny_female ) return true
    else return false
  }

  checkToChainEvolutions(pokemon: any): boolean{
    if(pokemon?.evolutions?.chain?.evolves_to?.length > 0) return true
    return false
  }

  checkAlternativesForm(pokemon: any): boolean{
    if(pokemon?.varieties?.length > 1) return true
    return false
  }

  getPokemonImage(pokemon: any): string{
    return pokemon?.sprites?.other?.['official-artwork']?.front_default
  }

  meterFormatter(num) {
    return (num * 0.1).toFixed(1) + 'm / ' + ((num * 0.1) * 3.28084).toFixed(2) +' "'
  }

  klFormatter(num) {
    return (num * 0.1).toFixed(1) + 'kg / ' + ((num * 0.1) * 2.20462).toFixed(2) +' lib'
  }

  getEvolutionChains(chain: any): any{
      let evoChain = [];
      let evoData = chain;

      do {
        let evoDetails = evoData['evolution_details'][0];
        let evolutionMethod: string;

        if(evoDetails?.min_level) evolutionMethod =  evoDetails?.min_level
        else if(evoDetails?.item?.name) evolutionMethod = evoDetails?.item?.name
        else if(evoDetails?.held_item?.name) evolutionMethod = 'held item '+evoDetails?.held_item?.name
        else if(evoDetails?.known_move) evolutionMethod = 'known move '+evoDetails?.known_move?.name
        else if(evoDetails?.known_move_type) evolutionMethod = 'know move type '+evoDetails?.known_move_type?.nmame
        // else if(evoDetails?.trigger?.name) evolutionMethod = evoDetails?.trigger?.name
        else if(evoDetails?.min_happiness) evolutionMethod = 'happiness '+evoDetails?.min_happiness

        evoChain.push({
          "species_name": evoData.species.name,
          "min_level": !evoDetails ? 1 : evolutionMethod,
          "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
          "item": !evoDetails ? null : evoDetails.item,
          "url": evoData.species.url
        });

        if(evoData['evolves_to']?.length > 0){
          for(let i = 1; i < evoData?.['evolves_to']?.length; i++){
            let evoDetails = evoData?.['evolves_to'][i]?.['evolution_details'][0];

            evoChain.push({
              "species_name": evoData['evolves_to'][i]?.species?.name,
              "min_level": !evoDetails ? 1 : evoDetails?.min_level || evoDetails?.item?.name|| evoDetails?.held_item?.name || chain?.['evolves_to'][i]?.['evolution_details'][3]?.item?.name || evoDetails?.location?.name || evoDetails?.time_of_day || 'know move type '+evoDetails?.known_move_type?.name,
              "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
              "item": !evoDetails ? null : evoDetails.item,
              "url": evoData['evolves_to'][i]?.species?.url
            });
          }
        }

        evoData = evoData['evolves_to'][0];
      } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

      return evoChain
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

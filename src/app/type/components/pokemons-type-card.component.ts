import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { clearName, getPokemonImagePrincipal, getPokemonPokedexNumber, getTypeClassColor, trackById } from '@pokemon/shared/utils/utils/functions';


@Component({
  selector: 'app-pokemons-type-card',
  template:`
    <ion-card class="card-stats fade-in-image">

      <ion-card-header class="card-header displayed">
        <div class="action-wrapper">
          <ion-button color="primary" class="margin-button" (click)="pokemonOrMove = 1">{{ 'COMMON.POKEMON' | translate }}</ion-button>
          <ion-button color="primary" class="margin-button" (click)="pokemonOrMove = 2">{{ 'COMMON.MOVE' | translate }}</ion-button>
        </div>
        <h2 *ngIf="pokemonOrMove === 1; else allMovesTitle">{{ 'COMMON.LEARN_POKEMON' | translate }}</h2>
        <ng-template #allMovesTitle>
          <h2>{{ 'COMMON.ALL_TYPE_MOVES' | translate }}</h2>
        </ng-template>
      </ion-card-header>
      <ion-card-content class="div-accuracy">
        <!-- LEARNING BY POKEMON  -->

        <ng-container *ngIf="pokemonOrMove === 1; else allMoves">
          <ion-card class="div-pokemon-learning ion-activatable ripple-parent" *ngFor="let pokemon of type?.pokemon; trackBy: trackById" [routerLink]="['/pokemon/'+getPokemonPokedexNumber(pokemon?.pokemon?.url)]" >
            <ion-card-content class="pokemon-item">
              <ion-label class="span-complete">#{{getPokemonPokedexNumber(pokemon?.pokemon?.url)}}</ion-label>
              <ion-label class="span-complete capital-letter">{{clearName(pokemon?.pokemon?.name)}}</ion-label>
              <ion-avatar slot="start">
                <img loading="lazy" [src]="getPokemonImagePrincipal(pokemon?.pokemon?.url)" [alt]="getPokemonImagePrincipal(pokemon?.pokemon?.url)" (error)="errorImage($event)">
              </ion-avatar>
            </ion-card-content>
            <!-- RIPPLE EFFECT -->
            <ion-ripple-effect></ion-ripple-effect>
          </ion-card>
        </ng-container>

        <!-- ALL MOVES  -->
        <ng-template #allMoves>
          <ion-card class="card-type div-min-height middle-width move ion-activatable ripple-parent" *ngFor="let item of type?.moves; trackBy: trackById" [routerLink]="['/move/'+getPokemonPokedexNumber(item?.url)]" [ngClass]="getTypeClassColor(item?.name)">
            <ion-label class="capital-letter">{{clearName(item?.name)}}</ion-label>
            <!-- RIPPLE EFFECT -->
            <ion-ripple-effect></ion-ripple-effect>
          </ion-card>
        </ng-template>

      </ion-card-content>
    </ion-card>
  `,
  styleUrls: ['./pokemons-type-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonsTypeCardComponent {

  getPokemonImagePrincipal = getPokemonImagePrincipal;
  getPokemonPokedexNumber = getPokemonPokedexNumber;
  getTypeClassColor = getTypeClassColor;
  clearName = clearName;
  trackById = trackById;
  @Input() pokemonOrMove: number;
  @Input() type: any;


  constructor() { }


  errorImage(event) {
    event.target.src = '../../../assets/images/notFound.png';
  }

}

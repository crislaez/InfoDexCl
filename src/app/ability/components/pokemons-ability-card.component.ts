import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Ability } from '@pokemon/shared/ability-m';
import { clearName, defaultImagePokemon, getPokemonImagePrincipal, getPokemonPokedexNumber, trackById } from '@pokemon/shared/utils/utils/functions';

@Component({
  selector: 'app-pokemons-ability-card',
  template:`
    <ion-card class="container-card card-stats fade-in-image">
      <ion-card-header class="card-header">
        <h2>{{ 'COMMON.LEARN_POKEMON' | translate }}</h2>
      </ion-card-header>
      <ion-card-content class="div-accuracy">

        <ng-container *ngIf="ability?.pokemon?.length > 0; else noData">
          <ion-card class="div-pokemon-learning ion-activatable ripple-parent" *ngFor="let pokemon of ability?.pokemon; trackBy: trackById"  [routerLink]="['/pokemon/'+getPokemonPokedexNumber(pokemon?.pokemon?.url)]" >
            <ion-card-content class="pokemon-item">
              <ion-label class="span-complete">#{{getPokemonPokedexNumber(pokemon?.pokemon?.url)}}</ion-label>
              <ion-label class="span-complete capital-letter">{{clearName(pokemon?.pokemon?.name)}}</ion-label>
              <ion-avatar slot="start">
                <img loading="lazy" [src]="getPokemonImagePrincipal(pokemon?.pokemon?.url)" (error)="errorImage($event)">
              </ion-avatar>
              <div class="card-stats-div"><span class="span-dark">{{ 'COMMON.HIDE' | translate }}:</span>
              <span *ngIf="pokemon?.is_hidden === true; else hideAbility">{{ 'COMMON.YES' | translate }}</span>
                <ng-template #hideAbility>{{ 'COMMON.NO' | translate }}</ng-template>
              </div>
            </ion-card-content>

            <!-- RIPPLE EFFECT -->
            <ion-ripple-effect></ion-ripple-effect>
          </ion-card>
        </ng-container>
      </ion-card-content>
    </ion-card>

    <!-- IS NO DATA  -->
    <ng-template #noData>
      <div class="error-serve">
        <span >{{ 'COMMON.NO_DATA' | translate }}</span>
      </div>
    </ng-template>
  `,
  styleUrls: ['./pokemons-ability-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonsAbilityCardComponent {

  getPokemonImagePrincipal = getPokemonImagePrincipal;
  getPokemonPokedexNumber = getPokemonPokedexNumber;
  defaultImagePokemon = defaultImagePokemon;
  clearName = clearName;
  trackById = trackById;
  @Input() ability: Ability;


  constructor() { }

  errorImage(event) {
    event.target.src = '../../../assets/images/notFound.png';
  }

}

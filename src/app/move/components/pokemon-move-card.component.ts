import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Move } from '@pokemon/shared/move-m';
import { clearName, getPokemonImagePrincipal, getPokemonPokedexNumber, trackById } from '@pokemon/shared/utils/utils/functions';


@Component({
  selector: 'app-pokemon-move-card',
  template:`
    <ion-card class="container-card card-stats fade-in-image">
      <ion-card-header class="card-header">
        <h2>{{ 'COMMON.LEARN_POKEMON' | translate }}</h2>
      </ion-card-header>

      <ion-card-content class="div-accuracy">
        <ion-card class="div-pokemon-learning ion-activatable ripple-parent" *ngFor="let pokemon of move?.learned_by_pokemon; trackBy: trackById" [routerLink]="['/pokemon/'+getPokemonPokedexNumber(pokemon?.url)]" >
          <ion-card-content class="pokemon-item">
            <ion-label class="span-complete">#{{getPokemonPokedexNumber(pokemon?.url)}} </ion-label>
            <ion-label class="span-complete capital-letter">{{clearName(pokemon?.name)}}</ion-label>
            <ion-avatar slot="start">
              <img loading="lazy" [src]="getPokemonImagePrincipal(pokemon?.url)" [alt]="getPokemonImagePrincipal(pokemon?.url)" (error)="errorImage($event)">
            </ion-avatar>
          </ion-card-content>

          <!-- RIPPLE EFFECT -->
          <ion-ripple-effect></ion-ripple-effect>
        </ion-card>
      </ion-card-content>
    </ion-card>
  `,
  styleUrls: ['./pokemon-move-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonMoveCardComponent {

  getPokemonImagePrincipal = getPokemonImagePrincipal;
  getPokemonPokedexNumber = getPokemonPokedexNumber;
  clearName = clearName;
  trackById = trackById;
  @Input() move: Move;


  constructor() { }


  errorImage(event) {
    event.target.src = '../../../assets/images/notFound.png';
  }


}

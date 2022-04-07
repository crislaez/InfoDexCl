import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pokemon } from '@pokemon/shared/pokemon';
import { clearName, getClassColorType, getPokemonPokedexNumber, trackById } from '@pokemon/shared/utils/utils/functions';

@Component({
  selector: 'app-pokemon-selected-card',
  template:`
    <div class="header-container">
      <ion-back-button defaultHref="/home" class="color-menu" [text]="''"></ion-back-button>
      <h1 class="capital-letter">{{clearName(pokemon?.name)}}</h1>
      <div class="header-container-empty" ></div>
      <ng-container *ngIf="pokemon?.types">
        <h2>{{ 'COMMON.TYPE' | translate}}</h2>
        <ion-card
          *ngFor="let type of pokemon?.types; trackBy: trackById"
          [routerLink]="['/type/'+getPokemonPokedexNumber(type?.type?.url)]"
          class="card-type ion-activatable ripple-parent"
          [ngStyle]="{'box-shadow':type?.type?.name=== 'dark' ? '0px 0px 10px white' : '0px 0px 10px gray' }"
          [ngClass]="getClassColorType(null, type?.type?.name)">

          <ion-label class="capital-letter">{{ type?.type?.name }}</ion-label>
          <!-- RIPPLE EFFECT -->
          <ion-ripple-effect></ion-ripple-effect>
        </ion-card>
      </ng-container>
    </div>
  `,
  styleUrls: ['./pokemon-selected-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonSelectedCardComponent {

  getPokemonPokedexNumber = getPokemonPokedexNumber;
  getClassColorType = getClassColorType;
  clearName = clearName;
  trackById = trackById;
  @Input() pokemon: Pokemon;


  constructor() { }

}

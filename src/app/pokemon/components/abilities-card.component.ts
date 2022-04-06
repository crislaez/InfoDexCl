import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pokemon } from '@pokemon/shared/pokemon';
import { clearName, getPokemonPokedexNumber, trackById } from '@pokemon/shared/utils/utils/functions';

@Component({
  selector: 'app-abilities-card',
  template:`
    <ion-card class="container-card card-stats fade-in-image" *ngIf="pokemon?.abilities?.length > 0">
      <ion-card-header class="card-header">
        <h2>{{ 'COMMON.ABILITIES' | translate}}</h2>
      </ion-card-header>

      <ng-container *ngFor="let ability of pokemon?.abilities; trackBy: trackById" >
        <ion-card class="card-type no-margin ability ion-activatable ripple-parent" [routerLink]="['/ability/'+getPokemonPokedexNumber(ability?.ability?.url)]" >
          <ion-label class="capital-letter">{{clearName(ability?.ability?.name)}} </ion-label>

          <!-- RIPPLE EFFECT -->
          <ion-ripple-effect></ion-ripple-effect>
        </ion-card>

        <div class="card-stats-div"><span class="span-dark">{{ 'COMMON.HIDE' | translate}}: </span>
          <span *ngIf="ability?.is_hidden === true; else hideAbility">{{ 'COMMON.YES' | translate}}</span>
          <ng-template #hideAbility>{{ 'COMMON.NO' | translate}}</ng-template>
        </div>
      </ng-container>
    </ion-card>
  `,
  styleUrls: ['./abilities-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbilitiesCardComponent {

  getPokemonPokedexNumber = getPokemonPokedexNumber;
  clearName = clearName;
  trackById = trackById;
  @Input() pokemon: Pokemon;


  constructor() { }


}

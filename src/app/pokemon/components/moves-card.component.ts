import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pokemon } from '@pokemon/shared/pokemon';
import { clearName, getPokemonPokedexNumber, trackById } from '@pokemon/shared/utils/utils/functions';

@Component({
  selector: 'app-moves-card',
  template:`
    <ion-card class="container-card card-stats fade-in-image" *ngIf="pokemon?.moves?.length > 0">
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

      </ng-container>
    </ion-card>
  `,
  styleUrls: ['./moves-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovesCardComponent {

  getPokemonPokedexNumber = getPokemonPokedexNumber;
  clearName = clearName;
  trackById = trackById;
  @Input() pokemon: Pokemon;


  constructor() { }


}

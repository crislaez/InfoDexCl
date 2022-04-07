import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pokemon } from '@pokemon/shared/pokemon';
import { trackById } from '@pokemon/shared/utils/utils/functions';

@Component({
  selector: 'app-stats-card',
  template:`
    <ion-card class="container-card card-stats fade-in-image">
      <ion-card-header class="card-header">
        <h2>{{ 'COMMON.STATS' | translate}}</h2>
      </ion-card-header>

      <ion-card-content class="card-stats">

        <div class="card-stats">
          <div class="card-stats-left">
            <ion-button color="primary" (click)="stastsValue = 1">{{ 'COMMON.BASE_STATS' | translate }}</ion-button>
          </div>
          <div class="card-stats-rigth">
            <ion-button color="primary" (click)="stastsValue = 2">{{ 'COMMON.MAX_STATS' | translate }}</ion-button>
          </div>
        </div>

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

        <div class="card-stats-div capital-letter"><span class="span-dark">{{ 'COMMON.TOTAL' | translate }}:</span></div>
        <div class="card-stats-div">{{totalStats(pokemon?.stats)}}</div>
      </ion-card-content>
    </ion-card>
  `,
  styleUrls: ['./stats-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsCardComponent {

  trackById = trackById;
  @Input() pokemon: Pokemon;
  stastsValue = 1;


  constructor() { }


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

}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pokemon } from '@pokemon/shared/pokemon';

@Component({
  selector: 'app-base-experience-card',
  template:`
    <ion-card class="container-card card-stats fade-in-image">
      <ion-card-header class="card-header">
        <h2>{{ 'COMMON.INTERESTING_DATA' | translate}}</h2>
      </ion-card-header>
      <ng-container >
        <div class="card-stats-div"><span class="span-dark">{{ 'COMMON.BASE_EXPERIENCE' | translate }}:</span></div>
        <div class="card-stats-div">{{pokemon?.base_experience}}</div>
        <div class="card-stats-div"><span class="span-dark">{{ 'COMMON.HEIGHT' | translate }}:</span></div>
        <div class="card-stats-div">{{meterFormatter(pokemon?.height)}}</div>
        <div class="card-stats-div"><span class="span-dark">{{ 'COMMON.WEIGHT' | translate }}:</span></div>
        <div class="card-stats-div">{{klFormatter(pokemon?.weight)}}</div>
      </ng-container>
    </ion-card>
  `,
  styleUrls: ['./base-experience-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseExperienceCardComponent {

  @Input() pokemon: Pokemon;


  constructor() { }


  meterFormatter(num) {
    return (num * 0.1).toFixed(1) + 'm / ' + ((num * 0.1) * 3.28084).toFixed(2) +' "'
  }

  klFormatter(num) {
    return (num * 0.1).toFixed(1) + 'kg / ' + ((num * 0.1) * 2.20462).toFixed(2) +' lib'
  }

}

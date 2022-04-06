import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Move } from '@pokemon/shared/move-m';
import { getClassColor, getPokemonPokedexNumber, trackById } from '@pokemon/shared/utils/utils/functions';


@Component({
  selector: 'app-move-features',
  template:`
    <ion-card class="card-stats fade-in-image">
      <ion-card-header class="card-header">
        <h2>{{ 'COMMON.DATA' | translate }}</h2>
      </ion-card-header>
      <ion-card-content class="div-accuracy">
        <div class="div-accuracy-stats">
          <div><span class="span-dark">{{ 'COMMON.POWER' | translate }}:</span></div>
          <div *ngIf="move?.power; else noItem">{{move?.power}}</div>
        </div>
        <div class="div-accuracy-stats">
          <div><span class="span-dark">{{ 'COMMON.TYPE' | translate }}:</span></div>
          <div class="card-type radius ion-activatable ripple-parent" *ngIf="move?.type?.name; else noItem" [routerLink]="['/type/'+getPokemonPokedexNumber(move?.type?.url)]" [ngClass]="getClassColor(move?.type?.name)">
            <ion-label class="capital-letter">{{move?.type?.name}}</ion-label>
            <!-- RIPPLE EFFECT -->
            <ion-ripple-effect></ion-ripple-effect>
          </div>
        </div>
        <div class="div-accuracy-stats">
          <div><span class="span-dark">{{ 'COMMON.DAMAGE_CLASS' | translate }}:</span></div>
          <div class="card-type radius" *ngIf="move?.damage_class?.name; else noItem"[ngClass]="getClassColor(move?.damage_class?.name)">
            <ion-label class="capital-letter">{{move?.damage_class?.name}}</ion-label>
          </div>
        </div>
        <div class="div-accuracy-stats">
          <div><span class="span-dark">{{ 'COMMON.PP' | translate }}:</span></div>
          <div class="capital-letter" *ngIf="move?.pp; else noItem">{{move?.pp}}</div>
        </div>
        <div class="div-accuracy-stats">
          <div><span class="span-dark">{{ 'COMMON.ACCURACY' | translate }}:</span></div>
          <div class="capital-letter" *ngIf="move?.accuracy; else noItem">{{move?.accuracy}}</div>
        </div>
        <div class="div-accuracy-stats">
          <div><span class="span-dark">{{ 'COMMON.PRIORITY' | translate }}:</span></div>
          <div class="capital-letter" *ngIf="move?.priority; else noItem">{{move?.priority}}</div>
        </div>
        <div class="div-accuracy-stats">
          <div><span class="span-dark">{{ 'COMMON.EFFECT_CHANCE' | translate }}:</span></div>
          <div class="capital-letter" *ngIf="move?.effect_chance; else noItem">{{move?.effect_chance}}</div>
        </div>
        <div *ngIf="move?.stat_changes?.length > 0" class="div-accuracy-stats" >
          <div><span class="span-dark">Stats change:</span></div>
          <div class="capital-letter" *ngFor="let stat of move?.stat_changes; trackBy: trackById">{{stat?.stat?.name}}</div>
        </div>
      </ion-card-content>
    </ion-card>

    <!-- IS NO DATA  -->
    <ng-template #noItem>
      <div> - </div>
    </ng-template>
  `,
  styleUrls: ['./move-features.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoveFeaturesComponent  {

  getPokemonPokedexNumber = getPokemonPokedexNumber;
  getClassColor = getClassColor;
  trackById = trackById;
  @Input() move: Move;



}

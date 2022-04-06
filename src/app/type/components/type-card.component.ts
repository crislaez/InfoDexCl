import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getClassColor, getPokemonPokedexNumber, trackById } from '@pokemon/shared/utils/utils/functions';

@Component({
  selector: 'app-type-card',
  template:`
    <ion-card class="container-card card-stats fade-in-image">
      <ion-card-header class="card-header">
        <h2>{{ title | translate }}</h2>
      </ion-card-header>
      <ion-card-content *ngIf="items?.length; else noData" class="div-accuracy">
        <ion-card class="card-type ion-activatable ripple-parent" *ngFor="let item of items; trackBy: trackById" [routerLink]="['/type/'+getPokemonPokedexNumber(item?.url)]" [ngClass]="getClassColor(item?.name)">
          <ion-label class="capital-letter">{{item?.name}}</ion-label>

          <ion-ripple-effect></ion-ripple-effect>
        </ion-card>
      </ion-card-content>
    </ion-card>

    <!-- IS NO DATA  -->
    <ng-template #noData>
      <ion-card-content class="no-data">
        <span >{{ 'COMMON.NO_DATA' | translate }}</span>
      </ion-card-content>
    </ng-template>
  `,
  styleUrls: ['./type-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeCardComponent {

  getPokemonPokedexNumber = getPokemonPokedexNumber;
  getClassColor = getClassColor;
  trackById = trackById;
  @Input() title: string;
  @Input() items: any[];


  constructor() { }



}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { clearName, defaultImagePokemon, EntityStatus, errorImage, getCardrBackground, getClassColor, getPokemonImagePrincipal, getPokemonPokedexNumber, trackById } from '@pokemon/shared/utils/utils/functions';


@Component({
  selector: 'app-infinite-scroll',
  template:`
    <ng-container *ngIf="!!isPokemon">
      <ion-card class="ion-activatable ripple-parent fade-in-image" *ngFor="let item of items; let i = index; trackBy: trackById" [routerLink]="['/pokemon/'+ getPokemonPokedexNumber(item?.url)]" >
        <ion-card-content class="pokemon-item" [ngClass]="getCardrBackground(i)">
          <ion-label class="capital-letter span-white">#{{getPokemonPokedexNumber(item?.url)}}  {{clearName(item?.name)}}</ion-label>
          <ion-avatar slot="start">
            <img loading="lazy" [src]="getPokemonImagePrincipal(item?.url)" [alt]="item?.name" (error)="errorImage($event,  defaultImagePokemon(item?.url))">
          </ion-avatar>
        </ion-card-content>

        <!-- RIPPLE EFFECT -->
        <ion-ripple-effect></ion-ripple-effect>
      </ion-card>
    </ng-container>

    <ng-container *ngIf="!isPokemon">
      <ion-card class="ion-activatable ripple-parent fade-in-image" *ngFor="let item of items; let i = index; trackBy: trackById" [ngClass]="getClass(item?.name, i)" [routerLink]="[route+ item?.name]" >
        <ion-card-content class="type-item">
          <ion-label class="capital-letter span-white">{{item?.name}}</ion-label>
        </ion-card-content>

        <!-- RIPPLE EFFECT -->
        <ion-ripple-effect></ion-ripple-effect>
      </ion-card>
    </ng-container>

    <!-- INFINITE SCROLL  -->
    <ng-container *ngIf="total as total">
      <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event, total)">
        <ion-infinite-scroll-content class="loadingspinner">
          <app-spinner [top]="'0%'" *ngIf="$any(status) === 'pending'"></app-spinner>
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ng-container>
  `,
  styleUrls: ['./infinite-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteScrollComponent {

  getPokemonImagePrincipal = getPokemonImagePrincipal;
  getCardrBackground = getCardrBackground;
  getPokemonPokedexNumber = getPokemonPokedexNumber;
  defaultImagePokemon = defaultImagePokemon;
  getClassColor = getClassColor;
  clearName = clearName;
  trackById = trackById;
  errorImage = errorImage;
  @Input() items: any
  @Input() total: number;
  @Input() status: EntityStatus;
  @Input() route: string;
  @Input() isPokemon: boolean = false;
  @Input() isType: boolean = false;
  @Output() loadDataTrigger = new EventEmitter<{event: any, total:number}>();


  constructor() { }


  getClass(name: string, i: number): string{
    return this.isType ? this.getClassColor(name) : this.getCardrBackground(i)
  }

  loadData(event: any, total: number): void{
    this.loadDataTrigger.next({event, total})
  }


}

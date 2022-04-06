import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pokemon } from '@pokemon/shared/pokemon';
import { clearName, getPokemonImagePrincipal, getPokemonPokedexNumber, trackById } from '@pokemon/shared/utils/utils/functions';

@Component({
  selector: 'app-alternatives-form-card',
  template:`
    <ion-card class="container-card card-stats fade-in-image" *ngIf="checkAlternativesForm(pokemon)">
      <ion-card-header class="card-header">
        <h2>{{ 'COMMON.ALTERNATIVES_FORM' | translate}}</h2>
      </ion-card-header>

      <ion-card class="pokemon-evolution ion-activatable ripple-parent" *ngFor="let alternativeForm of pokemon?.varieties; trackBy: trackById" [routerLink]="['/pokemon/'+ getPokemonPokedexNumber(alternativeForm?.pokemon?.url)]">
        <ion-card-content>
          <ion-avatar slot="start">
            <img loading="lazy" [src]="getPokemonImagePrincipal(alternativeForm?.pokemon?.url)" [alt]="getPokemonImagePrincipal(alternativeForm?.pokemon?.url)" (error)="errorImage($event)">
          </ion-avatar>
          <ion-label class="capital-letter">{{clearName(alternativeForm?.pokemon?.name)}} </ion-label>
        </ion-card-content>
        <!-- RIPPLE EFFECT -->
        <ion-ripple-effect></ion-ripple-effect>
      </ion-card>
    </ion-card>
  `,
  styleUrls: ['./alternatives-form-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlternativesFormCardComponent {

  getPokemonPokedexNumber = getPokemonPokedexNumber;
  getPokemonImagePrincipal = getPokemonImagePrincipal;
  clearName = clearName;
  trackById = trackById;
  @Input() pokemon: Pokemon


  constructor() { }


  errorImage(event) {
    event.target.src = '../../../assets/images/notFound.png';
  }

  checkAlternativesForm(pokemon: any): boolean{
    if(pokemon?.varieties?.length > 1) return true
    return false
  }
}

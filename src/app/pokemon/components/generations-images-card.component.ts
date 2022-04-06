import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pokemon } from '@pokemon/shared/pokemon';
import { trackById } from '@pokemon/shared/utils/utils/functions';


@Component({
  selector: 'app-generations-images-card',
  template:`
    <ng-container *ngFor="let generations of getKeysGenerationsImages(pokemon?.sprites?.versions); trackBy: trackById">
      <ng-container *ngFor="let generation of getKeysGenerationsImages(getPokemonGenerations(pokemon, generations)); trackBy: trackById">
        <ion-card class="card-generations-sprite fade-in-image" *ngIf="ifGenerationImage(getPokemonGeneration(pokemon, generations, generation))" >
          <h3 class="capital-letter">{{generation}}</h3>
          <img *ngIf="getPokemonGeneration(pokemon, generations, generation)?.back_default as image" class="card-pokemon-image" [src]="image" [alt]="image" (error)="errorImage($event, notFoundImage)">
          <img *ngIf="getPokemonGeneration(pokemon, generations, generation)?.back_female as image" class="card-pokemon-image" [src]="image" [alt]="image" (error)="errorImage($event, notFoundImage)">
          <img *ngIf="getPokemonGeneration(pokemon, generations, generation)?.back_shiny as image" class="card-pokemon-image" [src]="image" [alt]="image" (error)="errorImage($event, notFoundImage)">
          <img *ngIf="getPokemonGeneration(pokemon, generations, generation)?.back_shiny_female as image" class="card-pokemon-image" [src]="image" [alt]="image" (error)="errorImage($event, notFoundImage)">
          <img *ngIf="getPokemonGeneration(pokemon, generations, generation)?.front_default as image" class="card-pokemon-image" [src]="image" [alt]="image" (error)="errorImage($event, notFoundImage)">
          <img *ngIf="getPokemonGeneration(pokemon, generations, generation)?.front_female as image" class="card-pokemon-image" [src]="image" [alt]="image" (error)="errorImage($event, notFoundImage)">
          <img *ngIf="getPokemonGeneration(pokemon, generations, generation)?.front_shiny as image" class="card-pokemon-image" [src]="image" [alt]="image" (error)="errorImage($event, notFoundImage)">
          <img *ngIf="getPokemonGeneration(pokemon, generations, generation)?.front_shiny_female as image" class="card-pokemon-image" [src]="image" [alt]="image" (error)="errorImage($event, notFoundImage)">
        </ion-card>
      </ng-container>
    </ng-container>
  `,
  styleUrls: ['./generations-images-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenerationsImagesCardComponent {

  trackById = trackById;
  @Input() pokemon: Pokemon;
  notFoundImage: string = '../../../assets/images/notFound.png';


  constructor() { }


  errorImage(event, url) {
    event.target.src = url;
  }

  getPokemonGenerations(pokemon: any, generations: string ): string {
    return pokemon?.sprites?.versions?.[generations]
  }

  getPokemonGeneration(pokemon: any, generations: string, generation: string ): any {
    return pokemon?.sprites?.versions?.[generations]?.[generation]
  }

  getKeysGenerationsImages(generations): any {
    return Object.keys(generations).filter(item => item !== '__proto__')
  }

  ifGenerationImage(generation: any): boolean{
    if(generation?.back_default || generation?.back_female || generation?.back_shiny || generation?.back_shiny_female ||
    generation?.front_default || generation?.front_female || generation?.front_shiny || generation?.front_shiny_female ) return true
    else return false
  }

}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pokemon } from '@pokemon/shared/pokemon';
import { clearName, getPokemonImagePrincipal, getPokemonPokedexNumber, trackById } from '@pokemon/shared/utils/utils/functions';

@Component({
  selector: 'app-evolution-chain-card',
  template:`
    <ion-card class="container-card card-stats fade-in-image" *ngIf="checkToChainEvolutions(pokemon)">
      <ion-card-header class="card-header">
        <h2>{{ 'COMMON.CHAIN_EVOLUTION' | translate}}</h2>
      </ion-card-header>

      <ion-card class="pokemon-evolution ion-activatable ripple-parent" *ngFor="let chain of getChainEvolution(pokemon?.evolutions?.chain, []); trackBy: trackById" [routerLink]="['/pokemon/'+ getPokemonPokedexNumber(chain?.url)]">
        <ion-card-content>
          <ion-avatar slot="start">
            <img loading="lazy" [src]="getPokemonImagePrincipal(chain?.url)" [alt]="getPokemonImagePrincipal(chain?.url)" (error)="errorImage($event)">
          </ion-avatar>
          <ion-label class="capital-letter span-dark">
            {{clearName(chain?.species_name)}}
          </ion-label>
          <br>
          <ion-label >
            <span *ngIf="hasEvolution(chain?.evolution_metod)">{{ clearName(chain?.evolution_metod) }}</span>
          </ion-label>
        </ion-card-content>

        <!-- RIPPLE EFFECT -->
        <ion-ripple-effect></ion-ripple-effect>
      </ion-card>
    </ion-card>
  `,
  styleUrls: ['./evolution-chain-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EvolutionChainCardComponent {

  getPokemonPokedexNumber = getPokemonPokedexNumber;
  getPokemonImagePrincipal = getPokemonImagePrincipal;
  clearName = clearName;
  trackById = trackById;
  @Input() pokemon: Pokemon;


  constructor() { }


  errorImage(event) {
    event.target.src = '../../../assets/images/notFound.png';
  }

  checkToChainEvolutions(pokemon: any): boolean{
    if(pokemon?.evolutions?.chain?.evolves_to?.length > 0) return true
    return false
  }

  getChainEvolution(chain, total): {species_name:string, evolution_metod:string, url:string}[] {

    const { name: species_name = null, url = null } = chain?.species || {};
    const [ details = null ] = chain?.evolution_details;
    const { trigger = null, item = null, min_level = null, min_happiness = null, location = null, known_move_type = null, held_item = null, time_of_day = null } = details || {};
    const { name: trigger_name = null } = trigger || {};
    const { name: itemName = null } = item || {};
    const { name: locationName = null } = location || {};
    const { name: knowMoveName = null } = known_move_type || {};
    const { name: heldItemName = null } = held_item || {};

    const method = min_level || itemName || (min_happiness ? `happinness ${min_happiness} ${( time_of_day ? `time of day: ${time_of_day}` : '')}` : '') || locationName || (knowMoveName ? `know move type ${knowMoveName}` : '') || heldItemName || time_of_day || null;

    total = [ ...(total ? total : []),
      {
        species_name,
        evolution_metod: (method ? `${trigger_name}: ${method}` : trigger_name),
        url
      }
    ];

    if(chain?.evolves_to?.length === 0){
      return total
    }

    let obj = {};

    return chain?.evolves_to?.reduce((acc, el) => {
      return [
        ...(acc ? acc : []),
        ...this.getChainEvolution(el, total)
      ]
    },[])?.filter(item => {
      const { species_name = null } = item || {}
      if(!obj[species_name]){
        obj[species_name] = true;
        return item
      }
    })
  }

  hasEvolution(text: string): boolean{
    return text?.split(' ')?.[0]?.includes('null') ? false : true;
  }

}

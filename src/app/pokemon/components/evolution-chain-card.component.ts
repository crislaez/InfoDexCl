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

      <!-- getEvolutionChains(pokemon?.evolutions?.chain) -->
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
            <span *ngIf="chain?.trigger_name">{{ clearName(chain?.trigger_name) }} {{ chain?.item }}</span>
            <span *ngIf="chain?.min_level && chain?.min_level !== 1"> : {{ chain?.min_level }}</span>
          </ion-label>

          <ion-label *ngIf="!chain?.trigger_name" class="color-menu-second"> - </ion-label>
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

  // getEvolutionChains(chain: any): any{
  //   let evoChain = [];
  //   let evoData = chain;


  //   do {
  //     let evoDetails = evoData['evolution_details'][0];
  //     let evolutionMethod: string;

  //     if(evoDetails?.min_level) evolutionMethod =  evoDetails?.min_level
  //     else if(evoDetails?.item?.name) evolutionMethod = evoDetails?.item?.name
  //     else if(evoDetails?.held_item?.name) evolutionMethod = 'held item '+evoDetails?.held_item?.name
  //     else if(evoDetails?.known_move) evolutionMethod = 'known move '+evoDetails?.known_move?.name
  //     else if(evoDetails?.known_move_type) evolutionMethod = 'know move type '+evoDetails?.known_move_type?.nmame
  //     // else if(evoDetails?.trigger?.name) evolutionMethod = evoDetails?.trigger?.name
  //     else if(evoDetails?.min_happiness) evolutionMethod = 'happiness '+evoDetails?.min_happiness

  //     evoChain.push({
  //       "species_name": evoData.species.name,
  //       "min_level": !evoDetails ? 1 : evolutionMethod,
  //       "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
  //       "item": !evoDetails ? null : evoDetails.item,
  //       "url": evoData.species.url
  //     });

  //     if(evoData['evolves_to']?.length > 0){
  //       for(let i = 1; i < evoData?.['evolves_to']?.length; i++){
  //         let evoDetails = evoData?.['evolves_to'][i]?.['evolution_details'][0];

  //         evoChain.push({
  //           "species_name": evoData['evolves_to'][i]?.species?.name,
  //           "min_level": !evoDetails ? 1 : evoDetails?.min_level || evoDetails?.item?.name|| evoDetails?.held_item?.name || chain?.['evolves_to'][i]?.['evolution_details'][3]?.item?.name || evoDetails?.location?.name || evoDetails?.time_of_day || 'know move type '+evoDetails?.known_move_type?.name,
  //           "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
  //           "item": !evoDetails ? null : evoDetails.item,
  //           "url": evoData['evolves_to'][i]?.species?.url
  //         });
  //       }
  //     }

  //     evoData = evoData['evolves_to'][0];
  //   } while (!!evoData && evoData.hasOwnProperty('evolves_to'));


  //   // console.log(evoChain);
  //   return evoChain
  // }

  getChainEvolution(chain: any, total): any{
    const { name: species_name = null, url = null } = chain?.species || {};
    const [ details = null ] = chain?.evolution_details;
    const { trigger = null, item = null, min_level = null } = details || {};
    const { name:trigger_name = null } = trigger || {};
    const { name = null } = item || {};

    console.log('chain -> ',chain)
    console.log( species_name )

    total = [
      ...(total ? total : []),
      {
        species_name,
        trigger_name,
        min_level,
        item:name,
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
    },[]).filter(item => {
      const { species_name = null } = item || {}
      if(!obj[species_name]){
        obj[species_name] = true;
        return item
      }
    })
  }

}

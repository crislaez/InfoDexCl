import { IonContent } from "@ionic/angular"
import { Pokemon } from "@pokemon/shared/pokemon"

export const getPokemonImagePrincipal = (url: string): string => {
  const pokemonId =  url?.split('/')[6] || ''
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
}

export const defaultImagePokemon = (url: string): string => {
  const pokemonId =  url?.split('/')[6] || ''
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
}

export const getPokemonPokedexNumber = (url: string): string => {
  return  url?.split('/')[6] || ''
}

export const isNotData = (data: any): boolean => {
  return Object.keys(data || {})?.length > 0 ? true: false
}

export const trackById = (_: number, item: any): number => {
  return item.id;
}

export const getCardrBackground = (index: number): string => {
  const number = index.toString()?.split('')?.[3] ||
  index.toString()?.split('')?.[2] ||
  index.toString()?.split('')?.[1] ||
  index.toString()?.split('')?.[0]

  if (number.includes('0')) return 'green'
  if (number.includes('1')) return 'water'
  if (number.includes('2')) return 'rock'
  if (number.includes('3')) return 'electric'
  if (number.includes('4')) return 'fire'
  if (number.includes('5')) return 'ground'
  if (number.includes('6')) return 'ghost'
  if (number.includes('7')) return 'normal'
  if (number.includes('8')) return 'ice'
  if (number.includes('9')) return 'fairy'
}

export const getClassColor = (name): string => {
  if(name.toLowerCase() === 'grass') return 'green'
  if(name.toLowerCase() === 'water') return 'water'
  if(name.toLowerCase() === 'bug') return 'bug'
  if(name.toLowerCase() === 'dark') return 'dark'
  if(name.toLowerCase() === 'dragon') return 'dragon'
  if(name.toLowerCase() === 'electric') return 'electric'
  if(name.toLowerCase() === 'fire') return 'fire'
  if(name.toLowerCase() === 'fighting') return 'fighting'
  if(name.toLowerCase() === 'fly' || name.toLowerCase() === 'flying') return 'fly'
  if(name.toLowerCase() === 'ghost') return 'ghost'
  if(name.toLowerCase() === 'ground') return 'ground'
  if(name.toLowerCase() === 'ice') return 'ice'
  if(name.toLowerCase() === 'normal') return 'normal'
  if(name.toLowerCase() === 'poison') return 'poison'
  if(name.toLowerCase() === 'rock') return 'rock'
  if(name.toLowerCase() === 'steel') return 'steel'
  if(name.toLowerCase() === 'psychic') return 'psychic'
  if(name.toLowerCase() === 'fairy') return 'fairy'
}

export const getTypeClassColor = (type: string): string => {
  if(type === 'grass' ) return 'green'
  if(type === 'water') return 'water'
  if(type === 'bug') return 'bug'
  if(type === 'dark') return 'dark'
  if(type === 'dragon') return 'dragon'
  if(type === 'electric') return 'electric'
  if(type === 'fire') return 'fire'
  if(type === 'fighting') return 'fighting'
  if(type === 'fly' || type === 'flying') return 'fly'
  if(type === 'ghost') return 'ghost'
  if(type === 'ground') return 'ground'
  if(type === 'ice') return 'ice'
  if(type === 'normal') return 'normal'
  if(type === 'poison') return 'poison'
  if(type === 'rock') return 'rock'
  if(type === 'steel') return 'steel'
  if(type === 'psychic') return 'psychic'
  if(type === 'fairy') return 'fairy'
}

export const getClassColorType = (pokemon: Pokemon, type: string): string => {
  const pokemonName = pokemon?.types?.[0]?.type?.name;
  if(pokemonName === 'grass' || type === 'grass' ) return 'green'
  if(pokemonName === 'water' || type === 'water') return 'water'
  if(pokemonName === 'bug' || type === 'bug') return 'bug'
  if(pokemonName === 'dark' || type === 'dark') return 'dark'
  if(pokemonName === 'dragon' || type === 'dragon') return 'dragon'
  if(pokemonName === 'electric' || type === 'electric') return 'electric'
  if(pokemonName === 'fire' || type === 'fire') return 'fire'
  if(pokemonName === 'fighting' || type === 'fighting') return 'fighting'
  if(pokemonName === 'fly' || pokemonName === 'flying' || type === 'fly' || type === 'flying') return 'fly'
  if(pokemonName === 'ghost' || type === 'ghost') return 'ghost'
  if(pokemonName === 'ground' || type === 'ground') return 'ground'
  if(pokemonName === 'ice' || type === 'ice') return 'ice'
  if(pokemonName === 'normal' || type === 'normal') return 'normal'
  if(pokemonName === 'poison' || type === 'poison') return 'poison'
  if(pokemonName === 'rock' || type === 'rock') return 'rock'
  if(pokemonName === 'steel' || type === 'steel') return 'steel'
  if(pokemonName === 'psychic' || type === 'psychic') return 'psychic'
  if(pokemonName === 'fairy' || type === 'fairy') return 'fairy'
}


export const clearName = (name: string): string => {
  if(name === null) return ''
  return name?.replace(/-/g, " ") || name
}

export const errorImage = (event, url) => {
  const image = '../../../../assets/images/notFound.png'
  event.target.src = url || image;
}

export const gotToTop = (content: IonContent): void => {
  content.scrollToTop(500);
}

export enum EntityStatus {
  Initial = 'initial',
  Pending = 'pending',
  Loaded = 'loaded',
  Error = 'error'
};

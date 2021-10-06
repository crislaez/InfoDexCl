import { IonContent } from "@ionic/angular"

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

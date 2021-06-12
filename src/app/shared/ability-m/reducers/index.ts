import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAbility from './ability.reducer';

export const abilityKey = 'ability';

export interface State {
  [abilityKey]: fromAbility.State
}

export const reducer = fromAbility.reducer;

export const getAbilityState = createFeatureSelector<State, fromAbility.State>(abilityKey);


export const getAbilities = createSelector(
  getAbilityState,
  fromAbility.getAbilities
)

export const getPending = createSelector(
  getAbilityState,
  fromAbility.getPending
)

// export const getChaptersByBook = (passageName: string) => createSelector(
//   getBooks,
//  (getBooks) => {
//    return getBooks?.find( ({passage}) => passage == passageName)?.chapters || []
//  }
// )



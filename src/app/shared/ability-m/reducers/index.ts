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

export const getStatus = createSelector(
  getAbilityState,
  fromAbility.getStatus
)

export const getError = createSelector(
  getAbilityState,
  fromAbility.getError
)

export const getAbility = createSelector(
  getAbilityState,
  fromAbility.getAbility
)

export const getAbilityStatus = createSelector(
  getAbilityState,
  fromAbility.getAbilityStatus
)

export const getAbilityError = createSelector(
  getAbilityState,
  fromAbility.getAbilityError
)





import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAbility from '../reducers/ability.reducer';

export const selectAbilityState = createFeatureSelector<fromAbility.State>(
  fromAbility.abilityFeatureKey
);


export const getAbilities = createSelector(
  selectAbilityState,
  (state) => state?.abilities
);

export const getStatus = createSelector(
  selectAbilityState,
  (state) => state?.status
);


export const getError = createSelector(
  selectAbilityState,
  (state) => state?.error
);

export const getAbility = createSelector(
  selectAbilityState,
  (state) => state?.ability
);


export const getAbilityStatus = createSelector(
  selectAbilityState,
  (state) => state?.abilityStatus
);

export const getAbilityError = createSelector(
  selectAbilityState,
  (state) => state?.abilityError
);

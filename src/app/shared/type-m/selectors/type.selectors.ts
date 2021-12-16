import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromType from '../reducers/type.reducer';

export const selectTypeState = createFeatureSelector<fromType.State>(
  fromType.typeFeatureKey
);


export const getTypes = createSelector(
  selectTypeState,
  (state) => state?.types
);

export const getStatus = createSelector(
  selectTypeState,
  (state) => state?.status
);

export const getError = createSelector(
  selectTypeState,
  (state) => state?.error
);

export const getType = createSelector(
  selectTypeState,
  (state) => state?.pokemonType
);

export const getTypeStatus = createSelector(
  selectTypeState,
  (state) => state?.typeStatus
);

export const getTypeError = createSelector(
  selectTypeState,
  (state) => state?.typeError
);

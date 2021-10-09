import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromType from './type.reducer';

export const typeKey = 'type';

export interface State {
  [typeKey]: fromType.State
}

export const reducer = fromType.reducer;

export const getTypeState = createFeatureSelector<State, fromType.State>(typeKey);


export const getTypes = createSelector(
  getTypeState,
  fromType.getTypes
)

export const getStatus = createSelector(
  getTypeState,
  fromType.getStatus
)

export const getError = createSelector(
  getTypeState,
  fromType.getError
)


export const getType = createSelector(
  getTypeState,
  fromType.getType
)

export const getTypeStatus = createSelector(
  getTypeState,
  fromType.getTypeStatus
)

export const getTypeError = createSelector(
  getTypeState,
  fromType.getTypeError
)


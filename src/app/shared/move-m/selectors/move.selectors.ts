import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMove from '../reducers/move.reducer';

export const selectMoveState = createFeatureSelector<fromMove.State>(
  fromMove.moveFeatureKey
);

export const getMoves = createSelector(
  selectMoveState,
  (state) => state?.moves
)

export const getStatus = createSelector(
  selectMoveState,
  (state) => state?.status
)

export const getError = createSelector(
  selectMoveState,
  (state) => state?.error
)

export const getMove = createSelector(
  selectMoveState,
  (state) => state?.move
)

export const getMoveStatus = createSelector(
  selectMoveState,
  (state) => state?.moveStatus
)

export const getMoveError = createSelector(
  selectMoveState,
  (state) => state?.move
)

import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMove from './move.reducer';

export const moveKey = 'move';

export interface State {
  [moveKey]: fromMove.State
}

export const reducer = fromMove.reducer;

export const getMoveState = createFeatureSelector<State, fromMove.State>(moveKey);


export const getMoves = createSelector(
  getMoveState,
  fromMove.getMoves
)

export const getStatus = createSelector(
  getMoveState,
  fromMove.getStatus
)

export const getError = createSelector(
  getMoveState,
  fromMove.getError
)

export const getMove = createSelector(
  getMoveState,
  fromMove.getMove
)

export const getMoveStatus = createSelector(
  getMoveState,
  fromMove.getMoveStatus
)

export const getMoveError = createSelector(
  getMoveState,
  fromMove.getMoveError
)





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

export const getPending = createSelector(
  getMoveState,
  fromMove.getPending
)

// export const getChaptersByBook = (passageName: string) => createSelector(
//   getBooks,
//  (getBooks) => {
//    return getBooks?.find( ({passage}) => passage == passageName)?.chapters || []
//  }
// )



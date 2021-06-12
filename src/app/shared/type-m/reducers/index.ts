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

export const getPending = createSelector(
  getTypeState,
  fromType.getPending
)

// export const getChaptersByBook = (passageName: string) => createSelector(
//   getBooks,
//  (getBooks) => {
//    return getBooks?.find( ({passage}) => passage == passageName)?.chapters || []
//  }
// )



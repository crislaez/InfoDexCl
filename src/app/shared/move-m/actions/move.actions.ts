import { createAction, props, union} from '@ngrx/store';
import { Move } from '../models';
import { EntityStatus } from '../../shared/utils/utils';

export const loadMoves = createAction(
  '[Move] Load moves'
);

export const saveMoves = createAction(
  '[Move] Save moves',
  props<{moves: Move[], error:unknown, status: EntityStatus}>()
);

export const loadMovesFailure = createAction(
  '[Move] Load moves failure',
  props<{message: string}>()
);


const all = union({
  loadMoves,
  saveMoves
})

export type MoveActionsUnion = typeof all;

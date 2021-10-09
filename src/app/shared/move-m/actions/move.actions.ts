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


export const loadMove = createAction(
  '[Move] Load move',
  props<{moveName: string}>()
);

export const saveMove = createAction(
  '[Move] Save move',
  props<{move: Move, error:unknown, status: EntityStatus}>()
);

export const loadMoveFailure = createAction(
  '[Move] Load move failure',
  props<{message: string}>()
);


const all = union({
  loadMoves,
  saveMoves,
  loadMovesFailure,
  loadMove,
  saveMove,
  loadMoveFailure
})

export type MoveActionsUnion = typeof all;

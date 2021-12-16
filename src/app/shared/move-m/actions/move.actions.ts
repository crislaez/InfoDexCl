import { createAction, props, union} from '@ngrx/store';
import { Move } from '../models';
import { EntityStatus } from '../../utils/utils/functions';

export const loadMoves = createAction(
  '[Move] Load moves'
);

export const saveMoves = createAction(
  '[Move] Save moves',
  props<{moves: Move[], error:unknown, status: EntityStatus}>()
);



export const loadMove = createAction(
  '[Move] Load move',
  props<{moveName: string}>()
);

export const saveMove = createAction(
  '[Move] Save move',
  props<{move: Move, error:unknown, status: EntityStatus}>()
);



const all = union({
  loadMoves,
  saveMoves,
  loadMove,
  saveMove
})

export type MoveActionsUnion = typeof all;

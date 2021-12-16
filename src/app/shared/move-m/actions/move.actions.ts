import { createAction, props } from '@ngrx/store';
import { EntityStatus } from '../../utils/utils/functions';
import { Move } from '../models';

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


import { createAction, props, union} from '@ngrx/store';
import { Move } from '../models';

export const loadMoves = createAction('[Move] Load moves');
export const saveMoves = createAction('[Move] Save moves', props<{moves: Move[]}>());


const all = union({
  loadMoves,
  saveMoves
})

export type MoveActionsUnion = typeof all;

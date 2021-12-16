import { createReducer, on } from '@ngrx/store';
import { EntityStatus } from '../../utils/utils/functions';
import * as MoveActions from '../actions/move.actions';
import { Move } from '../models';

export const moveFeatureKey = 'move';

export interface State{
  moves?: Move[];
  status?: EntityStatus;
  error:unknown;
  move?: Move;
  moveStatus?: EntityStatus;
  moveError?: unknown;
}

const initialState: State = {
  moves: [],
  status: EntityStatus.Initial,
  error:undefined,
  move: {},
  moveStatus: EntityStatus.Initial,
  moveError:undefined,
}


export const reducer = createReducer(
  initialState,
  on(MoveActions.loadMoves, (state) => ({...state, error :undefined, status: EntityStatus.Pending})),
  on(MoveActions.saveMoves, (state, { moves, error, status }) => ({...state, moves, error, status  })),
  on(MoveActions.loadMove, (state) => ({...state, moveError :undefined, moveStatus: EntityStatus.Pending})),
  on(MoveActions.saveMove, (state, { move, error, status }) => ({...state, move, moveError: error, moveStatus: status  })),
);

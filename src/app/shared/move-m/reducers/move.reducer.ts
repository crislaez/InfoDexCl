import { createReducer, on  } from '@ngrx/store';
import { MoveActions } from '../actions';
import { Move } from '../models';
import { EntityStatus } from '../../shared/utils/utils';


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


const moveReducer = createReducer(
  initialState,
  on(MoveActions.loadMoves, (state) => ({...state, error :undefined, status: EntityStatus.Pending})),
  on(MoveActions.saveMoves, (state, { moves, error, status }) => ({...state, moves, error, status  })),
  on(MoveActions.loadMove, (state) => ({...state, moveError :undefined, moveStatus: EntityStatus.Pending})),
  on(MoveActions.saveMove, (state, { move, error, status }) => ({...state, move, moveError: error, moveStatus: status  })),
);

export function reducer(state: State | undefined, action: MoveActions.MoveActionsUnion){
  return moveReducer(state, action);
}

export const getMoves = (state: State) => state?.moves;
export const getStatus = (state: State) => state?.status;
export const getError = (state: State) => state?.error;

export const getMove = (state: State) => state?.move;
export const getMoveStatus = (state: State) => state?.moveStatus;
export const getMoveError = (state: State) => state?.move;

import { createReducer, on  } from '@ngrx/store';
import { MoveActions } from '../actions';
import { Move } from '../models';
import { EntityStatus } from '../../shared/utils/utils';


export interface State{
  moves?: Move[];
  status?: EntityStatus;
  error:unknown;
}

const initialState: State = {
  moves: [],
  status: EntityStatus.Initial,
  error:undefined
}


const moveReducer = createReducer(
  initialState,
  on(MoveActions.loadMoves, (state) => ({...state, status: EntityStatus.Pending})),
  on(MoveActions.saveMoves, (state, { moves, error, status }) => ({...state, moves, error, status  })),
);

export function reducer(state: State | undefined, action: MoveActions.MoveActionsUnion){
  return moveReducer(state, action);
}

export const getMoves = (state: State) => state?.moves;
export const getStatus = (state: State) => state?.status;
export const getError = (state: State) => state?.error;

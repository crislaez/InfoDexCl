import { createReducer, on  } from '@ngrx/store';
import { MoveActions } from '../actions';
import { Move } from '../models';


interface Status {
  pending?: boolean;
  error?: string;
}
export interface State{
  moves?: Move[];
  pending?: boolean;
}

const initialState: State = {
  pending: false,
  moves: [],
}


const moveReducer = createReducer(
  initialState,
  on(MoveActions.loadMoves, (state) => ({...state, pending: true})),
  on(MoveActions.saveMoves, (state, { moves }) => ({...state, moves, pending: false })),
);

export function reducer(state: State | undefined, action: MoveActions.MoveActionsUnion){
  return moveReducer(state, action);
}

export const getMoves = (state: State) => state?.moves;

export const getPending = (state: State) => state?.pending;

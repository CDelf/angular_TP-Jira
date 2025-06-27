import { createSelector } from '@ngrx/store';
import { BoardState } from './board.state';
import { AppState } from '../app.state';

export const selectBoardState = (state: AppState) => state.boardState;

export const selectBoards = createSelector(
  selectBoardState,
  (state: BoardState) => state.boards
);

export const selectSelectedBoard = createSelector(
  selectBoardState,
  (state: BoardState) =>
    state.boards.find(b => b.id === state.selectedBoardId) || null
);

export const selectSelectedBoardLists = createSelector(
  selectSelectedBoard,
  (board) => board?.lists ?? []
);

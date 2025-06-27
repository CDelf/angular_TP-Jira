import {createReducer, on} from '@ngrx/store';
import {addBoard, selectBoard, updateBoards} from './board.actions';
import {initialBoardState} from './board.state';
import {addList, removeList} from '../list/list.actions';
import {addTask, removeTask} from '../task/task.action';

export const boardReducer = createReducer(
  initialBoardState,

  on(addBoard, (state, { board }) => ({
    ...state,
    boards: [...state.boards, board]
  })),

  on(selectBoard, (state, { id }) => ({
    ...state,
    selectedBoardId: id
  })),

  on(updateBoards, (state, { boards }) => ({
    ...state,
    boards
  })),

on(addList, (state, { boardId, list }) => ({
  ...state,
  boards: state.boards.map(board =>
    board.id === boardId
      ? { ...board, lists: [...board.lists, list] }
      : board
  )
})),

  on(removeList, (state, { boardId, listTitle }) => ({
    ...state,
    boards: state.boards.map(board =>
      board.id === boardId
        ? { ...board, lists: board.lists.filter(l => l.title !== listTitle) }
        : board
    )
  })),

on(addTask, (state, { boardId, listTitle, task }) => ({
  ...state,
  boards: state.boards.map(board =>
    board.id === boardId
      ? {
        ...board,
        lists: board.lists.map(list =>
          list.title === listTitle
            ? { ...list, tasks: [...list.tasks, task] }
            : list
        )
      }
      : board
  )
})),

  on(removeTask, (state, { boardId, listTitle, taskDescription }) => ({
    ...state,
    boards: state.boards.map(board =>
      board.id === boardId
        ? {
          ...board,
          lists: board.lists.map(list =>
            list.title === listTitle
              ? {
                ...list,
                tasks: list.tasks.filter(t => t.description !== taskDescription)
              }
              : list
          )
        }
        : board
    )
  }))
);

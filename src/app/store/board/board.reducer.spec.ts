import { boardReducer } from './board.reducer';
import { addBoard, selectBoard } from './board.actions';
import { initialBoardState } from './board.state';
import { BoardData } from '../../../models';
import {addList, removeList} from '../list/list.actions';
import {addTask, removeTask} from '../task/task.action';

describe('boardReducer', () => {
  const sampleBoard: BoardData = {
    id: '1',
    title: 'Test Board',
    lists: []
  };

  it('should return the initial state', () => {
    const action = { type: 'Unknown' } as any;
    const state = boardReducer(undefined, action);

    expect(state).toEqual(initialBoardState);
  });

  it('should add a board with addBoard action', () => {
    const emptyState = {
      boards: [],
      selectedBoardId: null
    };

    const action = addBoard({ board: sampleBoard });
    const state = boardReducer(emptyState, action);

    expect(state.boards.length).toBe(1);
    expect(state.boards[0]).toEqual(sampleBoard);
  });

  it('should set selectedBoardId with selectBoard action', () => {
    const action = selectBoard({ id: sampleBoard.id });
    const state = boardReducer(initialBoardState, action);

    expect(state.selectedBoardId).toBe('1');
  });

  it('should add a list to the correct board', () => {
    const boardState = {
      ...initialBoardState,
      boards: [sampleBoard]
    };

    const action = addList({
      boardId: '1',
      list: { title: 'Todo', tasks: [] }
    });

    const newState = boardReducer(boardState, action);
    expect(newState.boards[0].lists.length).toBe(1);
    expect(newState.boards[0].lists[0].title).toBe('Todo');
  });

  it('should remove a list from the correct board', () => {
    const boardState = {
      ...initialBoardState,
      boards: [
        {
          id: '1',
          title: 'Test Board',
          lists: [
            { title: 'Todo', tasks: [] },
            { title: 'En cours', tasks: [] }
          ]
        }
      ]
    };

    const action = removeList({ boardId: '1', listTitle: 'Todo' });
    const newState = boardReducer(boardState, action);

    expect(newState.boards[0].lists.length).toBe(1);
    expect(newState.boards[0].lists[0].title).toBe('En cours');
  });
});

describe('Task reducer in boardReducer', () => {
  const boardWithList: BoardData = {
    id: '1',
    title: 'Board 1',
    lists: [
      {
        title: 'List 1',
        tasks: []
      }
    ]
  };

  const task = {
    description: 'Faire les tests',
    dueDate: '2025-07-01',
    priority: 'High',
    done: false
  };

  it('should add a task to the correct list', () => {
    const action = addTask({
      boardId: '1',
      listTitle: 'List 1',
      task
    });

    const state = {
      ...initialBoardState,
      boards: [boardWithList]
    };

    const newState = boardReducer(state, action);
    const updatedTasks = newState.boards[0].lists[0].tasks;

    expect(updatedTasks.length).toBe(1);
    expect(updatedTasks[0]).toEqual(task);
  });

  it('should remove a task by description', () => {
    const stateWithTask = {
      ...initialBoardState,
      boards: [
        {
          ...boardWithList,
          lists: [
            {
              title: 'List 1',
              tasks: [task]
            }
          ]
        }
      ]
    };

    const action = removeTask({
      boardId: '1',
      listTitle: 'List 1',
      taskDescription: 'Faire les tests'
    });

    const newState = boardReducer(stateWithTask, action);
    const tasksAfter = newState.boards[0].lists[0].tasks;

    expect(tasksAfter.length).toBe(0);
  });
});

import { createAction, props } from '@ngrx/store';
import { TaskData } from '../../../models';

export const addTask = createAction(
  '[Task] Add',
  props<{ boardId: string; listTitle: string; task: TaskData }>()
);

export const removeTask = createAction(
  '[Task] Remove',
  props<{ boardId: string; listTitle: string; taskDescription: string }>()
);

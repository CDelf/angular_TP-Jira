import { createAction, props } from '@ngrx/store';
import { ListData } from '../../../models';

export const addList = createAction(
  '[List] Add',
  props<{ boardId: string; list: ListData }>()
);

export const removeList = createAction(
  '[List] Remove',
  props<{ boardId: string; listTitle: string }>()
);

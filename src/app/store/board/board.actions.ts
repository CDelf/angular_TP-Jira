import {BoardData} from '../../../models';
import {createAction, props} from '@ngrx/store';

export const addBoard = createAction('[Board] Add', props<{ board: BoardData }>());
export const selectBoard = createAction('[Board] Select', props<{ id: string }>());
export const updateBoards = createAction('[Board] Update All', props<{ boards: BoardData[] }>());


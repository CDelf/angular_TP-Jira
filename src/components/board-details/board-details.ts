import {Component} from '@angular/core';

import {Board} from '../board/board';
import {BoardData} from '../../models';
import {v4 as uuidv4} from 'uuid';
import {Store} from '@ngrx/store';
import {addBoard, selectBoard} from '../../app/store/board/board.actions';
import {toSignal} from '@angular/core/rxjs-interop';
import {selectBoards, selectSelectedBoard} from '../../app/store/board/board.selectors';
import {AppState} from '../../app/store/app.state';


@Component({
  selector: 'app-board-details',
  imports: [
    Board
  ],
  templateUrl: './board-details.html',
  styleUrl: './board-details.css'
})
export class BoardDetails {
  newBoardName = '';
  boards;
  selectedBoard;

  constructor(private store: Store<AppState>) {
    this.boards = toSignal(this.store.select(selectBoards), { initialValue: [] });
    this.selectedBoard = toSignal(this.store.select(selectSelectedBoard), { initialValue: null });
  }

  createBoard() {
    const name = this.newBoardName.trim();
    if (!name) return;

    const newBoard: BoardData = {
      id: uuidv4(),
      title: name,
      lists: []
    };

    this.store.dispatch(addBoard({board: newBoard}));
    this.store.dispatch(selectBoard({id: newBoard.id}));
    this.newBoardName = '';
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newBoardName = input.value;
  }

  selectBoard(board: BoardData) {
    this.store.dispatch(selectBoard({id: board.id}));
  }
}

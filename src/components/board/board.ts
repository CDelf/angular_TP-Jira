import {Component, input} from '@angular/core';
import {List} from '../list/list';
import {ListData} from '../../models';
import {AppState} from '../../app/store/app.state';
import {Store} from '@ngrx/store';
import {selectSelectedBoard} from '../../app/store/board/board.selectors';
import { addList, removeList } from '../../app/store/list/list.actions'

@Component({
  selector: 'app-board',
  imports: [
    List
  ],
  templateUrl: './board.html',
  styleUrl: './board.css'
})
export class Board {

  lists = input<ListData[]>();
  newListTitle : string = '';
  selectedBoardId: string | null = null;

  constructor(private store: Store<AppState>) {
    this.store.select(selectSelectedBoard).subscribe(board => {
      this.selectedBoardId = board?.id ?? null;
    });
  }

  addList() {
    const title = this.newListTitle.trim();
    if (!title || !this.selectedBoardId) return;

    this.store.dispatch(addList({
      boardId: this.selectedBoardId,
      list: { title, tasks: [] }
    }));
    this.newListTitle = '';
  }

  removeList(title: string) {
    if (!this.selectedBoardId) return;

    this.store.dispatch(removeList({
      boardId: this.selectedBoardId,
      listTitle: title
    }));
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newListTitle = input.value;
  }
}

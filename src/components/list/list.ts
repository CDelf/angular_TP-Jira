import {Component, effect, input, output, signal} from '@angular/core';
import {Task} from '../task/task';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Modal} from '../modal/modal';
import {ListData, TaskData} from '../../models';
import {selectSelectedBoard} from '../../app/store/board/board.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '../../app/store/app.state';
import {addTask, removeTask} from '../../app/store/task/task.action';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-list',
  imports: [
    Task, ReactiveFormsModule, Modal
  ],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List {

  list = input<ListData>();
  title = input<string>();
  initialTasks = input<TaskData[]>();

  message = signal<string | null>(null);
  showModal = signal<boolean>(false);
  delete = output<void>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required]
    });

    effect(() => {
      const tasks = this.initialTasks() || [];
      console.log(`Liste "${this.title}" modifiée. Nouvelle valeur:`, tasks);
      this.message.set(`✅ La liste "${this.title}" a été modifiée (${tasks.length} tâche(s)).`);
      setTimeout(() => this.message.set(null), 3000);
    });
  }

  emitDelete() {
    this.delete.emit();
  }

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.form.reset();
  }

  async addTask() {
    if (this.form.invalid || !this.title) return;

    const board = await firstValueFrom(this.store.select(selectSelectedBoard));
    if (!board) return;

    const listTitle = this.title?.();
    if (!listTitle) return;

    const task: TaskData = {
      description: this.form.value.description,
      dueDate: this.form.value.dueDate,
      priority: this.form.value.priority,
      done: false
    };

    this.store.dispatch(addTask({ boardId: board.id, listTitle, task }));
    this.closeModal();
  }

  async removeTask(description: string) {
    const board = await firstValueFrom(this.store.select(selectSelectedBoard));
    const listTitle = this.title?.();
    if (!board || !listTitle) return;

    this.store.dispatch(removeTask({ boardId: board.id, listTitle, taskDescription: description }));
  }
}

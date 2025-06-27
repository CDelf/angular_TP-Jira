import {Component, input, output, signal} from '@angular/core';
import {Modal} from '../modal/modal';
import {ReactiveFormsModule} from '@angular/forms';
import {TaskData} from '../../models';

@Component({
  selector: 'app-task',
  imports: [
    Modal,
    ReactiveFormsModule
  ],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task {

  task = input<TaskData>();

  deleteTask = output<void>();
  showModal = signal<boolean>(false);
  checkboxChecked = signal(false);

  onDelete() {
    this.showModal.set(false);
    this.deleteTask.emit();
  }

  openModal() {
    this.checkboxChecked.set(true);
    this.showModal.set(true);
  }

  closeModal() {
    this.checkboxChecked.set(false);
    this.showModal.set(false);
  }
}

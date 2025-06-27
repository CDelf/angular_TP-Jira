import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {

  show = input<boolean>(false);
  close = output<void>();

  onClose() {
    this.close.emit();
  }
}

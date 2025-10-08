import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-dialog-modal',
  standalone: true,
  imports: [CommonModule],
  template: `<div></div>`,
  styles: []
})
export class DialogModalComponent {
  constructor(public dialogService: DialogService) {}
}

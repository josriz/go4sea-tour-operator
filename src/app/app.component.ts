// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DialogModalComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}

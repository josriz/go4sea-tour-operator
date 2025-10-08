// src/app/admin/admin-dashboard/collaboratore-dashboard/collaboratore-dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collaboratore-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="collaboratore-dashboard">
      <h2>👥 Dashboard Collaboratori</h2>
      <p>Sezione in costruzione. Nessun errore.</p>
    </div>
  `,
  styles: [`
    .collaboratore-dashboard {
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class CollaboratoreDashboardComponent {}

// src/app/admin/admin-dashboard/admin-dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  template: `
    <div class="dashboard-content">
      <h2>📊 Dashboard Principale</h2>
      <p>Benvenuto nella dashboard di Go4Sea Tour Operator.</p>
      <div class="stats">
        <div class="stat-card">
          <h3>🎯 Tour Attivi</h3>
          <p>12</p>
        </div>
        <div class="stat-card">
          <h3>👥 Clienti Totali</h3>
          <p>89</p>
        </div>
        <div class="stat-card">
          <h3>💰 Fatturato Mese</h3>
          <p>€12.500</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-content {
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-top: 20px;
    }

    .stat-card {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      text-align: center;
      border: 1px solid #dee2e6;
    }

    .stat-card h3 {
      margin: 0 0 8px 0;
      font-size: 0.9rem;
      color: #495057;
    }

    .stat-card p {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 600;
      color: #007bff;
    }
  `]
})
export class AdminDashboardComponent {}

// src/app/admin/admin-dashboard/report/report.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="report-page">
      <h2>📑 Report</h2>
      <p>Genera e visualizza i report di vendita, attività e performance.</p>

      <div class="actions">
        <button (click)="onGeneraReport()" class="btn btn-success">📊 Genera Report</button>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <h3>Tour Venduti</h3>
          <p>47</p>
        </div>
        <div class="stat-card">
          <h3>Fatturato</h3>
          <p>€8.900</p>
        </div>
        <div class="stat-card">
          <h3>Clienti Nuovi</h3>
          <p>12</p>
        </div>
        <div class="stat-card">
          <h3>Soddisfazione</h3>
          <p>96%</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .report-page {
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h2 { margin-bottom: 15px; color: #333; }
    p { color: #666; margin-bottom: 20px; }
    .btn {
      padding: 10px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
    }
    .btn-success {
      background: #28a745;
      color: white;
    }
    .stats-grid {
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
export class ReportComponent {
  onGeneraReport() {
    alert('Report generato e scaricato!');
  }
}

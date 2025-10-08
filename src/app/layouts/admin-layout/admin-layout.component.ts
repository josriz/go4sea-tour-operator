// src/app/layouts/admin-layout/admin-layout.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DialogModalComponent } from '../../dialog-modal/dialog-modal.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, DialogModalComponent],
  template: `
    <div class="admin-layout">
      <!-- Sidebar -->
      <aside class="sidebar" [class.collapsed]="collapsed">
        <div class="sidebar-header">
          <h4 *ngIf="!collapsed">Go4Sea Tour</h4>
          <button class="toggle-btn" (click)="toggleSidebar()">☰</button>
        </div>
        <nav>
          <a routerLink="/admin/dashboard" routerLinkActive="active" class="nav-link" title="Dashboard">
            📊 <span *ngIf="!collapsed">Dashboard</span>
          </a>
          <a routerLink="/admin/clienti" routerLinkActive="active" class="nav-link" title="Clienti">
            👥 <span *ngIf="!collapsed">Clienti</span>
          </a>
          <a routerLink="/admin/incarichi" routerLinkActive="active" class="nav-link" title="Incarichi">
            📁 <span *ngIf="!collapsed">Incarichi</span>
          </a>
          <a routerLink="/admin/report" routerLinkActive="active" class="nav-link" title="Report">
            📑 <span *ngIf="!collapsed">Report</span>
          </a>
          <a routerLink="/admin/impostazioni" routerLinkActive="active" class="nav-link" title="Impostazioni">
            ⚙️ <span *ngIf="!collapsed">Impostazioni</span>
          </a>
          <a routerLink="/admin/collaboratori" routerLinkActive="active" class="nav-link" title="Collaboratori">
            👥 <span *ngIf="!collapsed">Collaboratori</span>
          </a>
          <a (click)="logout()" class="nav-link logout-link" title="Logout">
            🚪 <span *ngIf="!collapsed">Logout</span>
          </a>
        </nav>
      </aside>

      <!-- Contenuto principale -->
      <main class="content">
        <header class="header">
          <h2>Bentornato, {{ username }}!</h2>
        </header>
        <div class="page-content">
          <router-outlet></router-outlet>
        </div>
      </main>

      <app-dialog-modal></app-dialog-modal>
    </div>
  `,
  styles: [`
    .admin-layout { display: flex; min-height: 100vh; background: #f9fafb; }

    /* Sidebar */
    .sidebar {
      width: 200px;
      background: #ffffff;
      color: #333;
      padding: 20px;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      overflow-y: auto;
      border-right: 1px solid #ddd;
      box-shadow: 2px 0 5px rgba(0,0,0,0.05);
      transition: width 0.3s;
      z-index: 1000;
    }
    .sidebar.collapsed { width: 60px; padding: 15px 5px; }
    .sidebar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .sidebar-header h4 { margin: 0; font-weight: 600; font-size: 1.1rem; }
    .toggle-btn { background: none; border: none; cursor: pointer; font-size: 1.2rem; color: #007bff; }
    .sidebar nav { display: flex; flex-direction: column; }
    .nav-link {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #333;
      text-decoration: none;
      padding: 12px 10px;
      border-radius: 6px;
      margin-bottom: 6px;
      font-size: 0.95rem;
      transition: all 0.2s;
    }
    .nav-link:hover { background: #e2e8f0; transform: translateX(2px); }
    .nav-link.active { background: #cbd5e1; font-weight: 600; border-left: 3px solid #007bff; }
    .logout-link { background: #f0f0f0 !important; color: #333; }
    .logout-link:hover { background: #d9d9d9 !important; }

    /* Contenuto principale */
    .content {
      flex: 1;
      margin-left: 200px; /* larghezza sidebar normale */
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow: hidden;
      transition: margin-left 0.3s;
    }
    .sidebar.collapsed ~ .content { margin-left: 60px; } /* margine quando sidebar collassata */
    .header {
      padding: 15px 20px;
      background: #ffffff;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: center;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 500;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .page-content {
      padding: 20px;
      flex: 1;
      overflow: auto;
      background: #f9fafb;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .sidebar { width: 60px; padding: 10px 5px; }
      .nav-link { justify-content: center; font-size: 0.85rem; padding: 10px 5px; }
      .content { margin-left: 60px; }
      .page-content { padding: 15px; }
      .header h2 { font-size: 1rem; text-align: center; }
    }
  `]
})
export class AdminLayoutComponent {
  username = localStorage.getItem('username') || 'Admin';
  collapsed = false;

  constructor(private authService: AuthService) {}

  logout() { this.authService.logout(); }

  toggleSidebar() { this.collapsed = !this.collapsed; }
}

// src/app/admin-dashboard/admin-dashboard.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="mb-0">
          <i class="bi bi-shield-lock-fill me-2"></i>Pannello Amministratore
        </h3>
        <span class="badge bg-primary">Ruolo: {{ role }}</span>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="alert alert-info">
            Benvenuto, <strong>{{ username }}</strong>. Hai accesso completo al sistema.
          </div>
        </div>
      </div>

      <div class="row g-3">
        <div class="col-12 col-sm-6">
          <div class="card border-primary h-100">
            <div class="card-body text-center">
              <i class="bi bi-people-fill text-primary" style="font-size: 2rem;"></i>
              <h5 class="mt-3">Gestisci Utenti</h5>
              <p class="text-muted">Aggiungi, modifica o elimina collaboratori.</p>
              <a
                routerLink="/admin/users"
                class="btn btn-outline-primary w-100">
                Vai a Gestione Utenti
              </a>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6">
          <div class="card border-success h-100">
            <div class="card-body text-center">
              <i class="bi bi-journal-text text-success" style="font-size: 2rem;"></i>
              <h5 class="mt-3">Visualizza Incarichi</h5>
              <p class="text-muted">Monitora tutti gli incarichi attivi.</p>
              <a
                routerLink="/dashboard"
                class="btn btn-outline-success w-100">
                Vai al Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-2px);
    }
    .badge {
      font-size: 0.9rem;
    }
  `]
})
export class AdminDashboardComponent {
  username = localStorage.getItem('username') || 'Utente';
  role = localStorage.getItem('role') || 'N/D';
}

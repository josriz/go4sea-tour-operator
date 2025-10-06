// src/app/admin-dashboard/users/user-management.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'COLLABORATOR';
  status: 'Attivo' | 'Sospeso';
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Gestione Utenti</h2>
    <p>Visualizza, aggiungi o modifica gli account utente per Go4Sea Tour Operator.</p>

    <div class="user-actions">
      <button [routerLink]="['/admin/users/add']" class="btn btn-primary">➕ Aggiungi Nuovo Utente</button>
    </div>

    <table class="user-table">
      <thead>
        <tr>
          <th>Nome Completo</th>
          <th>Email</th>
          <th>Ruolo</th>
          <th>Stato</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td><span [class]="'role-' + user.role.toLowerCase()">{{ user.role }}</span></td>
          <td><span [class]="'status-' + user.status.toLowerCase()">{{ user.status }}</span></td>
          <td>
            <button [routerLink]="['/admin/users/edit', user.id]" class="btn btn-sm btn-info">Modifica</button>
            <button (click)="deleteUser(user.id, user.name)" class="btn btn-sm btn-danger">Elimina</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    .user-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .user-table th, .user-table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    .user-table th { background-color: #f8f9fa; font-weight: bold; }
    .btn { padding: 8px 12px; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; display: inline-block; }
    .btn-primary { background-color: #007bff; color: white; }
    .btn-info { background-color: #17a2b8; color: white; }
    .btn-danger { background-color: #dc3545; color: white; }
    .btn-sm { padding: 6px 10px; font-size: 0.9em; }
    .role-admin { color: #007bff; background-color: #cce5ff; padding: 4px 8px; border-radius: 12px; font-size: 0.9em; }
    .role-collaborator { color: #28a745; background-color: #d4edda; padding: 4px 8px; border-radius: 12px; font-size: 0.9em; }
    .status-attivo { color: #155724; background-color: #d4edda; padding: 4px 8px; border-radius: 12px; font-size: 0.9em; }
    .status-sospeso { color: #721c24; background-color: #f8d7da; padding: 4px 8px; border-radius: 12px; font-size: 0.9em; }
  `]
})
export class UserManagementComponent {
  users: User[] = [];

  private apiUrl = 'https://go4sea-tour-operator.onrender.com/api/users';

  constructor(private http: HttpClient, private router: Router) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<User[]>(this.apiUrl).subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Errore nel caricare gli utenti', err)
    });
  }

  deleteUser(id: number, name: string): void {
    if (confirm(`Sei sicuro di voler eliminare l'utente ${name}?`)) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
          alert(`Utente ${name} eliminato con successo!`);
        },
        error: (err) => {
          console.error('Errore eliminazione', err);
          alert('Errore nell\'eliminare l\'utente.');
        }
      });
    }
  }
}

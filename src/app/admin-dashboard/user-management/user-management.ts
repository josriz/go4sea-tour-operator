// src/app/admin-dashboard/users/user-management.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interfaccia utente
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
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white p-6 rounded-xl shadow-2xl transition duration-300">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3">Gestione Utenti</h2>

      <!-- Form di Aggiunta/Modifica Utente -->
      <form (ngSubmit)="salvaUtente()" class="space-y-4 mb-8 p-4 border border-gray-200 rounded-xl shadow-inner bg-gray-50">
        <h3 class="text-xl font-semibold text-blue-600 mb-4">
          {{ utenteSelezionato ? 'Modifica Utente' : 'Aggiungi Nuovo Utente' }}
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Nome -->
          <div>
            <label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              [(ngModel)]="nuovoUtente.name"
              required
              class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="nuovoUtente.email"
              required
              class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
          </div>

          <!-- Ruolo -->
          <div>
            <label for="ruolo" class="block text-sm font-medium text-gray-700">Ruolo</label>
            <select
              id="ruolo"
              name="ruolo"
              [(ngModel)]="nuovoUtente.role"
              required
              class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border bg-white">
              <option value="" disabled>Seleziona ruolo</option>
              <option value="ADMIN">Amministratore</option>
              <option value="COLLABORATOR">Collaboratore</option>
            </select>
          </div>

          <!-- Stato -->
          <div>
            <label for="stato" class="block text-sm font-medium text-gray-700">Stato</label>
            <select
              id="stato"
              name="stato"
              [(ngModel)]="nuovoUtente.status"
              required
              class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border bg-white">
              <option value="" disabled>Seleziona stato</option>
              <option value="Attivo">Attivo</option>
              <option value="Sospeso">Sospeso</option>
            </select>
          </div>
        </div>

        <div class="flex space-x-4 pt-2">
          <button
            type="submit"
            class="flex-1 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-150">
            {{ utenteSelezionato ? 'Aggiorna Utente' : 'Aggiungi Utente' }}
          </button>

          @if (utenteSelezionato) {
            <button
              type="button"
              (click)="annullaModifica()"
              class="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-150">
              Annulla Modifica
            </button>
          }
        </div>
      </form>

      <!-- Filtri e Ricerca -->
      <div class="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          [(ngModel)]="filtroTesto"
          placeholder="Cerca per Nome o Email..."
          class="flex-grow p-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 min-w-[200px]">

        <select
          [(ngModel)]="filtroRuolo"
          class="p-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white">
          <option value="">Tutti i Ruoli</option>
          <option value="ADMIN">Amministratore</option>
          <option value="COLLABORATOR">Collaboratore</option>
        </select>

        <select
          [(ngModel)]="filtroStato"
          class="p-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white">
          <option value="">Tutti gli Stati</option>
          <option value="Attivo">Attivo</option>
          <option value="Sospeso">Sospeso</option>
        </select>
      </div>

      <!-- Tabella Utenti -->
      <div class="overflow-x-auto rounded-xl shadow-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-blue-600 text-white">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nome</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ruolo</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Stato</th>
              <th class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Azioni</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            @for (user of utentiFiltrati(); track user.id) {
              <tr class="hover:bg-gray-50 transition duration-150">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.role }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span [class]="'px-2 py-1 text-xs font-semibold rounded-full ' +
                    (user.status === 'Attivo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')">
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                  <button
                    (click)="modificaUtente(user)"
                    class="text-blue-600 hover:text-blue-900 font-semibold transition duration-150">
                    Modifica
                  </button>
                  <button
                    (click)="eliminaUtente(user.id, user.name)"
                    class="text-red-600 hover:text-red-900 font-semibold transition duration-150">
                    Elimina
                  </button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="5" class="px-6 py-4 text-center text-gray-500">Nessun utente trovato.</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class UserManagementComponent {
  // Lista utenti
  users: User[] = [
    { id: 1, name: 'Mario Rossi', email: 'mario.rossi@go4sea.it', role: 'ADMIN', status: 'Attivo' },
    { id: 2, name: 'Laura Verdi', email: 'laura.verdi@go4sea.it', role: 'COLLABORATOR', status: 'Attivo' },
    { id: 3, name: 'Andrea Bianchi', email: 'andrea.bianchi@go4sea.it', role: 'COLLABORATOR', status: 'Sospeso' },
    { id: 4, name: 'Giulia Neri', email: 'giulia.neri@go4sea.it', role: 'COLLABORATOR', status: 'Attivo' },
  ];

  // Stato form
  nuovoUtente: User = this.resetForm();
  utenteSelezionato: User | null = null;

  // Filtri
  filtroTesto: string = '';
  filtroRuolo: string = '';
  filtroStato: string = '';

  // Filtri calcolati
  utentiFiltrati = () => {
    let list = this.users;
    const filtroLower = this.filtroTesto.toLowerCase().trim();

    if (filtroLower) {
      list = list.filter(u =>
        u.name.toLowerCase().includes(filtroLower) ||
        u.email.toLowerCase().includes(filtroLower)
      );
    }

    if (this.filtroRuolo) {
      list = list.filter(u => u.role === this.filtroRuolo);
    }

    if (this.filtroStato) {
      list = list.filter(u => u.status === this.filtroStato);
    }

    return list;
  };

  private resetForm(): User {
    return { id: 0, name: '', email: '', role: 'COLLABORATOR', status: 'Attivo' };
  }

  salvaUtente(): void {
    if (!this.nuovoUtente.name || !this.nuovoUtente.email || !this.nuovoUtente.role || !this.nuovoUtente.status) {
      alert('Tutti i campi sono obbligatori.');
      return;
    }

    if (this.utenteSelezionato) {
      // Modifica esistente
      const index = this.users.findIndex(u => u.id === this.utenteSelezionato!.id);
      this.users[index] = { ...this.nuovoUtente, id: this.utenteSelezionato.id };
    } else {
      // Aggiunta nuovo
      const newId = Math.max(...this.users.map(u => u.id)) + 1;
      this.users.push({ ...this.nuovoUtente, id: newId });
    }

    this.resetFormAndSelection();
  }

  modificaUtente(user: User): void {
    this.utenteSelezionato = user;
    this.nuovoUtente = { ...user };
  }

  annullaModifica(): void {
    this.resetFormAndSelection();
  }

  private resetFormAndSelection(): void {
    this.nuovoUtente = this.resetForm();
    this.utenteSelezionato = null;
  }

  eliminaUtente(userId: number, userName: string): void {
    const confirmed = confirm(`Sei sicuro di voler eliminare l'utente ${userName}?`);
    if (confirmed) {
      this.users = this.users.filter(u => u.id !== userId);
    }
  }
}

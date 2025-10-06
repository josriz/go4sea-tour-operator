import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// PERCORSO CORRETTO: Risale di due livelli da /admin-dashboard/client-management/ a /app/
import { DialogService } from '../../dialog.service'; 
// Rimuovi l'import di DialogModalComponent se non usato nel template
// import { DialogModalComponent } from '../../dialog-modal/dialog-modal.component'; 

// Interfaccia per un Cliente
interface Cliente {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  hotel: string;
}

@Component({
  selector: 'app-client-management',
  standalone: true,
  // Rimuovi DialogModalComponent dall'array imports
  imports: [CommonModule, FormsModule], 
  template: `
    <div class="bg-white p-6 rounded-xl shadow-2xl transition duration-300">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3">Gestione Clienti e Strutture</h2>
      
      <!-- Form di Aggiunta/Modifica Cliente -->
      <form (ngSubmit)="salvaCliente()" class="space-y-4 mb-8 p-4 border border-gray-200 rounded-xl shadow-inner bg-gray-50">
        <h3 class="text-xl font-semibold text-blue-600 mb-4">{{ clienteSelezionato() ? 'Modifica Cliente' : 'Aggiungi Nuovo Cliente' }}</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <!-- Nome -->
          <div>
            <label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
            <input type="text" id="nome" name="nome" [(ngModel)]="nuovoCliente.nome" required
                   class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
          </div>
          
          <!-- Cognome -->
          <div>
            <label for="cognome" class="block text-sm font-medium text-gray-700">Cognome</label>
            <input type="text" id="cognome" name="cognome" [(ngModel)]="nuovoCliente.cognome" required
                   class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
          </div>
          
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" [(ngModel)]="nuovoCliente.email" required
                   class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
          </div>

          <!-- Hotel di Soggiorno (Struttura) -->
          <div>
            <label for="hotel" class="block text-sm font-medium text-gray-700">Hotel di Soggiorno (Struttura)</label>
            <select id="hotel" name="hotel" [(ngModel)]="nuovoCliente.hotel" required
                    class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border bg-white">
              <option value="" disabled>Seleziona una struttura</option>
              @for (struttura of struttureDisponibili(); track struttura) {
                <option [value]="struttura">{{ struttura }}</option>
              }
            </select>
          </div>

        </div>

        <div class="flex space-x-4 pt-2">
          <button type="submit" 
                  class="flex-1 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-150">
            {{ clienteSelezionato() ? 'Aggiorna Cliente' : 'Aggiungi Cliente' }}
          </button>
          
          @if (clienteSelezionato()) {
            <button type="button" (click)="annullaModifica()"
                    class="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-150">
              Annulla Modifica
            </button>
          }
        </div>
        @if (erroreForm()) {
            <p class="text-red-600 text-sm font-medium">{{ erroreForm() }}</p>
        }
      </form>

      <!-- Filtri e Ricerca -->
      <div class="flex flex-wrap gap-4 mb-6">
        <input type="text" [(ngModel)]="filtroTesto" placeholder="Cerca per Nome, Cognome o Email..."
               class="flex-grow p-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 min-w-[200px]">
        
        <select [(ngModel)]="filtroStruttura"
                class="p-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white">
          <option value="">Tutte le Strutture</option>
          @for (struttura of struttureDisponibili(); track struttura) {
            <option [value]="struttura">{{ struttura }}</option>
          }
        </select>
      </div>

      <!-- Tabella Clienti -->
      <div class="overflow-x-auto rounded-xl shadow-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-blue-600 text-white">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nome</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cognome</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider hidden sm:table-cell">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Struttura</th>
              <th class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Azioni</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            @for (cliente of clientiFiltrati(); track cliente.id) {
              <tr class="hover:bg-gray-50 transition duration-150">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ cliente.nome }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ cliente.cognome }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{{ cliente.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ cliente.hotel }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                  <button (click)="modificaCliente(cliente)"
                          class="text-blue-600 hover:text-blue-900 font-semibold transition duration-150">
                    Modifica
                  </button>
                  <button (click)="eliminaCliente(cliente.id)"
                          class="text-red-600 hover:text-red-900 font-semibold transition duration-150">
                    Elimina
                  </button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="5" class="px-6 py-4 text-center text-gray-500">Nessun cliente trovato.</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class ClientManagementComponent {
  // Dipendenze
  private dialog = inject(DialogService);

  // Stato Dati
  clienti = signal<Cliente[]>([
    { id: 1, nome: 'Mario', cognome: 'Rossi', email: 'mario.rossi@mail.it', hotel: 'Grand Palace' },
    { id: 2, nome: 'Luisa', cognome: 'Bianchi', email: 'luisa.bianchi@mail.it', hotel: 'Marechiaro' },
    { id: 3, nome: 'Giovanni', cognome: 'Verdi', email: 'giovanni.verdi@mail.it', hotel: 'Montagna d\'Oro' },
  ]);

  struttureDisponibili = signal(['Grand Palace', 'Marechiaro', 'Montagna d\'Oro', 'Vista Mare Resort']);

  // Stato Form
  nuovoCliente: Cliente = this.resetClienteForm();
  clienteSelezionato = signal<Cliente | null>(null);
  erroreForm = signal<string | null>(null);

  // Stato Filtri
  filtroTesto: string = '';
  filtroStruttura: string = '';

  // Dati calcolati (Computed)
  clientiFiltrati = computed(() => {
    let list = this.clienti();
    const filtroLower = this.filtroTesto.toLowerCase().trim();

    // Filtro per testo
    if (filtroLower) {
      list = list.filter(c => 
        c.nome.toLowerCase().includes(filtroLower) ||
        c.cognome.toLowerCase().includes(filtroLower) ||
        c.email.toLowerCase().includes(filtroLower)
      );
    }

    // Filtro per struttura
    if (this.filtroStruttura) {
      list = list.filter(c => c.hotel === this.filtroStruttura);
    }

    return list;
  });

  private getNextId(): number {
    const maxId = this.clienti().reduce((max, c) => Math.max(max, c.id), 0);
    return maxId + 1;
  }

  private resetClienteForm(): Cliente {
    return { id: 0, nome: '', cognome: '', email: '', hotel: '' };
  }

  // Azioni
  salvaCliente(): void {
    if (!this.nuovoCliente.nome || !this.nuovoCliente.cognome || !this.nuovoCliente.email || !this.nuovoCliente.hotel) {
      this.erroreForm.set('Tutti i campi sono obbligatori.');
      return;
    }
    this.erroreForm.set(null);

    const clienteDaSalvare = { ...this.nuovoCliente };

    this.clienti.update(currentClients => {
      if (this.clienteSelezionato()) {
        return currentClients.map(c => 
          c.id === clienteDaSalvare.id ? clienteDaSalvare : c
        );
      } else {
        clienteDaSalvare.id = this.getNextId();
        return [...currentClients, clienteDaSalvare];
      }
    });

    this.nuovoCliente = this.resetClienteForm();
    this.clienteSelezionato.set(null);
  }

  modificaCliente(cliente: Cliente): void {
    this.clienteSelezionato.set(cliente);
    this.nuovoCliente = { ...cliente };
  }

  annullaModifica(): void {
    this.clienteSelezionato.set(null);
    this.nuovoCliente = this.resetClienteForm();
    this.erroreForm.set(null);
  }

  eliminaCliente(id: number): void {
    this.dialog.chiediConferma(
      'Conferma Eliminazione Cliente',
      'Sei sicuro di voler eliminare questo cliente? L\'azione è irreversibile.'
    ).then((confermato: boolean) => { 
      if (confermato) {
        this.clienti.update(currentClients => 
          currentClients.filter(c => c.id !== id)
        );
      }
    }).catch((error: Error) => { 
      console.error('Errore durante la conferma di eliminazione:', error);
    });
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Prenotazione {
  id: number;
  cliente: string;
  struttura: string;
  checkIn: string;
  checkOut: string;
  stato: 'Confermata' | 'In attesa' | 'Annullata';
  prezzo: number;
}

@Component({
  selector: 'app-booking-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white p-6 rounded-xl shadow-2xl transition duration-300">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3">Gestione Prenotazioni</h2>

      <!-- Filtri -->
      <div class="flex flex-wrap gap-4 mb-6">
        <input type="text" [(ngModel)]="filtroCliente" placeholder="Cerca per cliente..."
               class="flex-grow p-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 min-w-[200px]">
        
        <select [(ngModel)]="filtroStato"
                class="p-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white">
          <option value="">Tutti gli stati</option>
          <option value="Confermata">Confermate</option>
          <option value="In attesa">In attesa</option>
          <option value="Annullata">Annullate</option>
        </select>
      </div>

      <!-- Tabella Prenotazioni -->
      <div class="overflow-x-auto rounded-xl shadow-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-blue-600 text-white">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cliente</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Struttura</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Check-in</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Check-out</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Stato</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Prezzo</th>
              <th class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Azioni</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            @for (p of prenotazioniFiltrate(); track p.id) {
              <tr class="hover:bg-gray-50 transition duration-150">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ p.cliente }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ p.struttura }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ p.checkIn }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ p.checkOut }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span [class]="'px-2 py-1 text-xs font-semibold rounded-full ' + 
                    (p.stato === 'Confermata' ? 'bg-green-100 text-green-800' :
                     p.stato === 'In attesa' ? 'bg-yellow-100 text-yellow-800' :
                     'bg-red-100 text-red-800')">
                    {{ p.stato }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{{ p.prezzo }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                  <button (click)="modifica(p)" class="text-blue-600 hover:text-blue-900">Modifica</button>
                  <button (click)="elimina(p.id)" class="text-red-600 hover:text-red-900">Elimina</button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="7" class="px-6 py-4 text-center text-gray-500">Nessuna prenotazione trovata.</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class BookingManagementComponent {
  prenotazioni: Prenotazione[] = [
    { id: 1, cliente: 'Mario Rossi', struttura: 'Grand Palace', checkIn: '2025-06-10', checkOut: '2025-06-15', stato: 'Confermata', prezzo: 850 },
    { id: 2, cliente: 'Laura Verdi', struttura: 'Marechiaro', checkIn: '2025-07-01', checkOut: '2025-07-08', stato: 'In attesa', prezzo: 1200 },
    { id: 3, cliente: 'Andrea Bianchi', struttura: 'Montagna d\'Oro', checkIn: '2025-08-20', checkOut: '2025-08-25', stato: 'Annullata', prezzo: 700 },
  ];

  filtroCliente = '';
  filtroStato = '';

  prenotazioniFiltrate = () => {
    let list = this.prenotazioni;
    const filtroLower = this.filtroCliente.toLowerCase().trim();

    if (filtroLower) {
      list = list.filter(p => p.cliente.toLowerCase().includes(filtroLower));
    }

    if (this.filtroStato) {
      list = list.filter(p => p.stato === this.filtroStato);
    }

    return list;
  };

  modifica(p: Prenotazione): void {
    alert(`Modifica prenotazione ID: ${p.id}`);
  }

  elimina(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questa prenotazione?')) {
      this.prenotazioni = this.prenotazioni.filter(p => p.id !== id);
    }
  }
}

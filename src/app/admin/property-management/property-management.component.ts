import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-management',
  standalone: true,
  imports: [CommonModule],
  // Usiamo il template inline per evitare errori NG2008
  template: `
    <div class="p-8 bg-white rounded-xl shadow-lg">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Gestione Strutture (Proprietà)</h1>
      <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg" role="alert">
        <p class="font-bold">Area In Sviluppo</p>
        <p>Il contenuto per la gestione delle strutture verrà implementato qui, utilizzando i segnali come la gestione clienti.</p>
      </div>
      <div class="mt-6">
        <button class="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150">Aggiungi Nuova Struttura</button>
      </div>
    </div>
  `,
  styles: []
})
export class PropertyManagementComponent {

}

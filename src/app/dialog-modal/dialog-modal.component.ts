import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Percorso: Da /src/app/dialog-modal/ risaliamo a /src/app/ per trovare il servizio.
import { DialogService } from '../dialog.service';

/**
 * Componente Modale per la conferma delle azioni.
 * Ascolta lo stato del DialogService per mostrare l'interfaccia di conferma.
 */
@Component({
  selector: 'app-dialog-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (dialogState()) {
      <!-- Overlay (Sfondo scuro) -->
      <div class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm transition duration-150">
        
        <!-- Contenitore Modale -->
        <div class="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full transition transform scale-100 ease-out">
          
          <h3 class="text-xl font-bold text-gray-900 mb-4 border-b pb-2">{{ dialogState()!.titolo }}</h3>
          
          <p class="text-gray-700 mb-6">{{ dialogState()!.messaggio }}</p>

          <!-- Azioni -->
          <div class="flex justify-end space-x-3">
            <button (click)="onAnnulla()"
                    class="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition duration-150 shadow-md">
              Annulla
            </button>
            <button (click)="onConferma()"
                    class="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-150 shadow-md">
              Conferma
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: []
})
export class DialogModalComponent {
  private dialogService = inject(DialogService);

  // Espone lo stato del dialogo per l'uso nel template
  dialogState = this.dialogService.dialogState;

  onConferma(): void {
    this.dialogService.risolvi(true);
  }

  onAnnulla(): void {
    this.dialogService.risolvi(false);
  }
}

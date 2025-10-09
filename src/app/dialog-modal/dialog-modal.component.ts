import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importiamo DialogService e l'interfaccia DialogContent dal percorso corretto
import { DialogService, DialogContent } from '../services/dialog.service'; 

@Component({
  selector: 'app-dialog-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Il MODAL: visibile solo se il dialogService ha un contenuto attivo -->
    <div class="modal-overlay" *ngIf="dialogService.isDialogOpen()" (click)="handleOverlayClick()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        
        <!-- Header del Modal -->
        <div class="modal-header">
          <h5 class="modal-title">{{ dialogService.dialogContent()?.title }}</h5> 
          <button type="button" class="close-btn" (click)="dialogService.closeDialog(false)">
            &times;
          </button>
        </div>

        <!-- Body del Modal (Contenuto Dinamico) -->
        <div class="modal-body">
          <p>{{ dialogService.dialogContent()?.message }}</p>
        </div>

        <!-- Footer del Modal (Bottoni Azioni) -->
        <div class="modal-footer">
          <!-- Bottone di ANNULLAMENTO (solo se non è una modale di solo alert) -->
          <button 
            *ngIf="dialogService.dialogContent()?.type === 'confirm'" 
            class="btn btn-secondary" 
            (click)="dialogService.closeDialog(false)">
            Annulla
          </button>

          <!-- Bottone di CONFERMA/OK -->
          <button 
            [class]="dialogService.dialogContent()?.type === 'confirm' ? 'btn btn-primary' : 'btn btn-info'"
            (click)="dialogService.closeDialog(true)">
            <!-- Risolve la potenziale non esistenza di confirmText nel template -->
            {{ dialogService.dialogContent()?.confirmText || 'OK' }} 
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Overlay e Posizionamento del Modal */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2000; 
      animation: fadeIn 0.15s ease-out;
      /* Previene lo scorrimento del corpo in caso di schermi piccoli */
      overflow-y: auto; 
    }

    .modal-content {
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      width: 90%; 
      max-width: 450px; 
      /* Impedisce al modale di superare l'altezza della videata */
      max-height: 90vh; 
      transform: scale(0.95);
      animation: zoomIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      display: flex;
      flex-direction: column;
    }
    
    @media (max-width: 768px) {
        .modal-content {
            margin: 10px;
        }
    }

    /* Struttura interna */
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid #eee;
      /* Impedisce al header di essere compresso o scorrere */
      flex-shrink: 0; 
    }
    .modal-title {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: #333;
    }
    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #aaa;
      line-height: 1;
      padding: 0;
      transition: color 0.15s;
      flex-shrink: 0;
    }
    .close-btn:hover {
      color: #333;
    }

    .modal-body {
      padding: 20px;
      flex-grow: 1;
      color: #555;
      /* Modifiche chiave: permette al body di scorrere se il contenuto è troppo lungo */
      overflow-y: auto; 
      flex-shrink: 1;
    }
    
    .modal-body p {
        /* Rimuovi margini indesiderati dal paragrafo nel body */
        margin: 0;
    }

    .modal-footer {
      padding: 15px 20px;
      border-top: 1px solid #eee;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      /* Impedisce al footer di essere compresso o scorrere */
      flex-shrink: 0; 
    }

    /* Stili Bottoni (usando classi generiche per coerenza) */
    .btn {
      padding: 8px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.15s;
    }
    .btn-primary {
      background-color: #007bff;
      color: white;
      border: 1px solid #007bff;
    }
    .btn-primary:hover {
      background-color: #0056b3;
    }
    .btn-secondary {
      background-color: #6c757d;
      color: white;
      border: 1px solid #6c757d;
    }
    .btn-secondary:hover {
      background-color: #5a6268;
    }
    .btn-info {
        background-color: #17a2b8;
        color: white;
        border: 1px solid #17a2b8;
    }
    .btn-info:hover {
        background-color: #138496;
    }

    /* Animazioni */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes zoomIn {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `]
})
export class DialogModalComponent { 
  constructor(public dialogService: DialogService) {}

  // CORREZIONE TS2345: Non passiamo esplicitamente l'evento per evitare problemi di tipizzazione
  @HostListener('document:keydown.escape') // Rimosso ['event']
  handleEscape() { // Rimosso 'event: KeyboardEvent'
    if (this.dialogService.isDialogOpen()) {
      this.dialogService.closeDialog(false); 
    }
  }

  // Permette di chiudere il modal cliccando sull'overlay (ma solo se è 'confirm')
  handleOverlayClick() {
    const dialog = this.dialogService.dialogContent();
    if (dialog && dialog.type === 'confirm') {
        this.dialogService.closeDialog(false);
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogService } from '../../../services/dialog.service';

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefono: string;
}

@Component({
  selector: 'app-client-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Uso delle utility di Bootstrap per card e spaziatura (p-3, mb-4) -->
    <div class="card shadow-sm p-3 mb-4">
      <div class="d-flex justify-content-between align-items-center">
        <!-- Titolo e bottone Aggiungi -->
        <h2><i class="bi bi-people-fill me-2"></i> Gestione Clienti</h2>
        <button (click)="onAggiungiCliente()" class="btn btn-success">
          <i class="bi bi-plus-lg me-1"></i> Aggiungi Cliente
        </button>
      </div>
    </div>

    <!-- TABELLA RESPONSIVE -->
    <!-- table-responsive garantisce lo scorrimento orizzontale su schermi piccoli, evitando di rompere il layout -->
    <div class="table-responsive">
      <!-- table: stile base; table-striped: righe alternate; table-hover: evidenzia al passaggio del mouse -->
      <table class="table table-striped table-hover client-table">
        <thead class="table-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Telefono</th>
            <th scope="col">Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let cliente of clienti; trackBy: trackById">
            <td>{{ cliente.id }}</td>
            <td>{{ cliente.nome }}</td>
            <td>{{ cliente.email }}</td>
            <td>{{ cliente.telefono }}</td>
            <td>
              <!-- Uso delle classi btn di Bootstrap per i bottoni di azione -->
              <button (click)="onVediCliente(cliente)" class="btn btn-sm btn-info text-white me-1">Vedi</button>
              <button (click)="onModificaCliente(cliente)" class="btn btn-sm btn-warning me-1">Modifica</button>
              <button (click)="onEliminaCliente(cliente)" class="btn btn-sm btn-danger">Elimina</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODALE DI AGGIUNTA/MODIFICA (Usa classi Bootstrap Modal) -->
    <!-- Questo è un semplice overlay custom, ma gli elementi interni sono Bootstrap-style -->
    <div *ngIf="formClienteVisibile" class="modal-overlay">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ formModifica ? 'Modifica Cliente' : 'Aggiungi Cliente' }}</h5>
            <!-- Classe 'btn-close' di Bootstrap per il bottone di chiusura -->
            <button type="button" class="btn-close" (click)="chiudiForm()"></button>
          </div>
          <div class="modal-body">
            <!-- Messaggio di errore visibile nel modale se presente -->
            <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>

            <form (ngSubmit)="salvaCliente()" autocomplete="off">
              <div class="mb-3">
                <label for="nome" class="form-label">Nome</label>
                <!-- Uso della classe form-control -->
                <input type="text" id="nome" [(ngModel)]="clienteForm.nome" name="nome" class="form-control" placeholder="Mario Rossi" required />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" [(ngModel)]="clienteForm.email" name="email" class="form-control" placeholder="mario@email.com" required />
              </div>
              <div class="mb-3">
                <label for="telefono" class="form-label">Telefono</label>
                <input type="text" id="telefono" [(ngModel)]="clienteForm.telefono" name="telefono" class="form-control" placeholder="333 1234567" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <!-- Bottoni di azione del Modale -->
            <button type="button" (click)="chiudiForm()" class="btn btn-secondary">Annulla</button>
            <button type="button" (click)="salvaCliente()" class="btn btn-primary">
              {{ formModifica ? 'Aggiorna' : 'Salva' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Rimosso gran parte del CSS della tabella grazie all'uso di classi Bootstrap (table, table-responsive).
      Manteniamo solo lo stile per l'overlay del modale, dato che non usiamo il JS di Bootstrap.
    */
    h2 {
      font-size: 1.5rem; /* Dimensione del titolo */
      color: #333;
    }

    /* Stili per l'Overlay del Modale (Mantenuto per la funzionalità) */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1050; /* Z-index alto */
    }

    /* Stili per il contenitore del Modale di Bootstrap sovrascritti se necessario */
    .modal-dialog {
      max-width: 450px;
      margin: 1.75rem auto;
    }

    /* Rimuoviamo il CSS complesso per la visualizzazione mobile della tabella, 
       affidandoci solo a 'table-responsive' di Bootstrap, che offre una soluzione più pulita (scorrimento orizzontale). */
    
    /* Nota: ho rimosso la logica @media (max-width: 800px) per la tabella per usare table-responsive. 
       Se preferisci il "card view" per le righe, dovrai ripristinare quel blocco CSS.
    */
  `]
})
export class ClientManagementComponent {
  clienti: Cliente[] = [
    { id: '001', nome: 'Mario Rossi', email: 'mario.rossi@email.com', telefono: '333 1234567' },
    { id: '002', nome: 'Laura Bianchi', email: 'laura.bianchi@email.com', telefono: '347 9876543' },
    { id: '003', nome: 'Giuseppe Verdi', email: 'giuseppe.verdi@email.com', telefono: '338 5556677' }
  ];

  formClienteVisibile = false;
  formModifica = false;
  clienteForm: Partial<Cliente> = {};
  
  // Aggiunto per il messaggio di errore/successo nel modale
  errorMessage: string | null = null; 

  constructor(private dialogService: DialogService) {}

  trackById(index: number, item: Cliente) {
    return item.id;
  }

  onAggiungiCliente() {
    this.clienteForm = {};
    this.formModifica = false;
    this.formClienteVisibile = true;
    this.errorMessage = null; // Resetta l'errore
  }

  onModificaCliente(cliente: Cliente) {
    this.clienteForm = { ...cliente };
    this.formModifica = true;
    this.formClienteVisibile = true;
    this.errorMessage = null; // Resetta l'errore
  }

  chiudiForm() {
    this.formClienteVisibile = false;
    this.clienteForm = {};
    this.errorMessage = null; // Resetta l'errore al chiudere il form
  }

  salvaCliente() {
    if (!this.clienteForm.nome || !this.clienteForm.email) {
      this.errorMessage = 'Nome ed email sono obbligatori.';
      return;
    }
    
    // Logica di salvataggio
    if (this.formModifica) {
      const index = this.clienti.findIndex(c => c.id === this.clienteForm.id);
      if (index !== -1) {
        this.clienti[index] = { ...this.clienti[index], ...this.clienteForm } as Cliente;
      }
    } else {
      const nuovoId = (this.clienti.length + 1).toString().padStart(3, '0');
      this.clienti.push({
        id: nuovoId,
        nome: this.clienteForm.nome!,
        email: this.clienteForm.email!,
        telefono: this.clienteForm.telefono || ''
      });
    }
    this.chiudiForm();
  }

  onVediCliente(cliente: Cliente) {
    // CORREZIONE: Cambiato 'mostraInformazioni' a 'mostraMessaggio'
    this.dialogService.mostraMessaggio(
        'Dettagli Cliente',
        `Nome: ${cliente.nome}\nEmail: ${cliente.email}\nTelefono: ${cliente.telefono}`
    );
  }

  async onEliminaCliente(cliente: Cliente) {
    const confermato = await this.dialogService.chiediConferma(
      'Conferma eliminazione',
      `Sei sicuro di voler eliminare ${cliente.nome}?`
    );
    if (confermato) {
      this.clienti = this.clienti.filter(c => c.id !== cliente.id);
    }
  }
}

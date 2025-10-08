// src/app/admin/admin-dashboard/client-management/client-management.component.ts
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
    <div class="client-management">
      <div class="header-actions">
        <h2>👥 Gestione Clienti</h2>
        <button (click)="onAggiungiCliente()" class="btn-add">
          ➕ Aggiungi Cliente
        </button>
      </div>

      <table class="client-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let cliente of clienti; trackBy: trackById">
            <td data-label="ID">{{ cliente.id }}</td>
            <td data-label="Nome">{{ cliente.nome }}</td>
            <td data-label="Email">{{ cliente.email }}</td>
            <td data-label="Telefono">{{ cliente.telefono }}</td>
            <td data-label="Azioni">
              <button (click)="onVediCliente(cliente)" class="btn-view">Vedi</button>
              <button (click)="onModificaCliente(cliente)" class="btn-edit">Modifica</button>
              <button (click)="onEliminaCliente(cliente)" class="btn-delete">Elimina</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div *ngIf="formClienteVisibile" class="modal-overlay">
        <div class="modal">
          <h3>{{ formModifica ? 'Modifica Cliente' : 'Aggiungi Cliente' }}</h3>
          <form (ngSubmit)="salvaCliente()" autocomplete="off">
            <div class="form-group">
              <label>Nome</label>
              <input type="text" [(ngModel)]="clienteForm.nome" name="nome" class="form-control" placeholder="Mario Rossi" required />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" [(ngModel)]="clienteForm.email" name="email" class="form-control" placeholder="mario@email.com" required />
            </div>
            <div class="form-group">
              <label>Telefono</label>
              <input type="text" [(ngModel)]="clienteForm.telefono" name="telefono" class="form-control" placeholder="333 1234567" />
            </div>
            <div class="modal-actions">
              <button type="button" (click)="chiudiForm()" class="btn-cancel">Annulla</button>
              <button type="submit" class="btn-save">
                {{ formModifica ? 'Aggiorna' : 'Salva' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .client-management {
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    .btn-add {
      background: #28a745;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 600;
    }
    .client-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.95rem;
    }
    .client-table th, .client-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #dee2e6;
    }
    .client-table th {
      background: #f8f9fa;
      font-weight: 600;
      color: #495057;
    }
    .btn-view, .btn-edit, .btn-delete {
      padding: 6px 10px;
      margin-right: 5px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
    }
    .btn-view { background: #17a2b8; color: white; }
    .btn-edit { background: #ffc107; color: black; }
    .btn-delete { background: #dc3545; color: white; }
    /* Mobile responsive tabella */
    @media (max-width: 800px) {
      .client-table, .client-table thead, .client-table tbody, .client-table th, .client-table td, .client-table tr {
        display: block;
        width: 100% !important;
      }
      .client-table thead {
        display: none;
      }
      .client-table tr {
        margin-bottom: 16px;
        border-bottom: 2px solid #eee;
        box-shadow: 0 0 3px rgba(0,0,0,0.05);
        background: #fafbfc;
        border-radius: 8px;
      }
      .client-table td {
        border: none;
        position: relative;
        padding-left: 50%;
        font-size: 1rem;
        min-height: 36px;
        text-align: right;
        padding-top: 12px;
        padding-bottom: 6px;
      }
      .client-table td:before {
        position: absolute;
        font-weight: 600;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 48%;
        text-align: left;
        white-space: nowrap;
        font-size: 0.98rem;
        color: #666;
        content: attr(data-label);
      }
    }
    /* Modale */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .modal {
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 400px;
      max-width: 95vw;
    }
    @media (max-width: 600px) {
      .modal { width: 98vw !important; min-width: unset !important; padding: 12px; border-radius: 7px; }
      .form-group label, .form-control { font-size: 1rem !important; }
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 0.9rem;
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }
    .btn-cancel {
      background: #6c757d;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-save {
      background: #007bff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }
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

  constructor(private dialogService: DialogService) {}

  trackById(index: number, item: Cliente) {
    return item.id;
  }

  onAggiungiCliente() {
    this.clienteForm = {};
    this.formModifica = false;
    this.formClienteVisibile = true;
  }

  onModificaCliente(cliente: Cliente) {
    this.clienteForm = { ...cliente };
    this.formModifica = true;
    this.formClienteVisibile = true;
  }

  chiudiForm() {
    this.formClienteVisibile = false;
    this.clienteForm = {};
  }

  salvaCliente() {
    if (!this.clienteForm.nome || !this.clienteForm.email) {
      alert('Nome ed email sono obbligatori');
      return;
    }
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
    alert(`Visualizzazione cliente: ${cliente.nome}`);
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

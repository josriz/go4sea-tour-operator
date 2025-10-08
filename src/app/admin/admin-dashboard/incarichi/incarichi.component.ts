// src/app/admin/admin-dashboard/incarichi/incarichi.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../../services/dialog.service'; // ✅ percorso corretto (3 livelli)

type StatoIncarico = 'in corso' | 'completato' | 'in ritardo';

interface Incarico {
  id: string;
  titolo: string;
  cliente: string;
  dataInizio: string;
  dataFine: string;
  stato: StatoIncarico;
}

@Component({
  selector: 'app-incarichi',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="incarichi-dashboard">
      <h2>📁 Gestione Incarichi</h2>
      <p>Organizza e monitora tutti gli incarichi in corso.</p>

      <div class="actions">
        <button (click)="onAggiungi()" class="btn btn-primary">➕ Aggiungi Incarico</button>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titolo</th>
            <th>Cliente</th>
            <th>Inizio</th>
            <th>Fine</th>
            <th>Stato</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let inc of incarichi; trackBy: trackById">
            <td data-label="ID">{{ inc.id }}</td>
            <td data-label="Titolo">{{ inc.titolo }}</td>
            <td data-label="Cliente">{{ inc.cliente }}</td>
            <td data-label="Inizio">{{ inc.dataInizio }}</td>
            <td data-label="Fine">{{ inc.dataFine }}</td>
            <td data-label="Stato">
              <span class="badge" [class]="getStatoClass(inc.stato)">{{ inc.stato }}</span>
            </td>
            <td data-label="Azioni">
              <button (click)="onModifica(inc)" class="btn btn-sm btn-edit">Modifica</button>
              <button (click)="onElimina(inc)" class="btn btn-sm btn-delete">Elimina</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .incarichi-dashboard {
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h2 { margin-bottom: 15px; color: #333; }
    p { color: #666; margin-bottom: 20px; }
    .actions { margin-bottom: 20px; }
    .btn {
      padding: 10px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
    }
    .btn-primary {
      background: #007bff;
      color: white;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.95rem;
    }
    .data-table th, .data-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #dee2e6;
    }
    .data-table th {
      background: #f8f9fa;
      font-weight: 600;
      color: #495057;
    }
    .badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .badge.in-corso { background: #17a2b8; color: white; }
    .badge.completato { background: #28a745; color: white; }
    .badge.in-ritardo { background: #dc3545; color: white; }
    .btn-sm {
      padding: 4px 8px;
      margin-right: 5px;
      font-size: 0.8rem;
    }
    .btn-edit { background: #17a2b8; color: white; }
    .btn-delete { background: #dc3545; color: white; }

    @media (max-width: 800px) {
      .data-table, .data-table thead, .data-table tbody, .data-table th, .data-table td, .data-table tr {
        display: block;
        width: 100%;
      }
      .data-table thead { display: none; }
      .data-table tr {
        margin-bottom: 16px;
        border-bottom: 2px solid #eee;
        border-radius: 8px;
        background: #fafbfc;
        overflow: hidden;
      }
      .data-table td {
        position: relative;
        padding-left: 50%;
        text-align: right;
        font-size: 1rem;
        min-height: 36px;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      .data-table td:before {
        content: attr(data-label);
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-weight: 600;
        width: 48%;
        text-align: left;
        white-space: nowrap;
        color: #666;
      }
    }
  `]
})
export class IncarichiComponent {
  incarichi: Incarico[] = [
    { id: 'INC001', titolo: 'Escursione Capri', cliente: 'Mario Rossi', dataInizio: '2025-10-10', dataFine: '2025-10-12', stato: 'in corso' },
    { id: 'INC002', titolo: 'Tour Costiera', cliente: 'Luca Bianchi', dataInizio: '2025-10-15', dataFine: '2025-10-18', stato: 'in ritardo' },
    { id: 'INC003', titolo: 'Noleggio Barche', cliente: 'Anna Verdi', dataInizio: '2025-10-20', dataFine: '2025-10-25', stato: 'completato' }
  ];

  constructor(private dialogService: DialogService) {}

  trackById(index: number, item: Incarico) {
    return item.id;
  }

  getStatoClass(stato: StatoIncarico): string {
    return `badge ${stato.replace(' ', '-')}`;
  }

  onAggiungi() {
    alert('Aggiungi nuovo incarico');
  }

  onModifica(inc: Incarico) {
    alert(`Modifica incarico: ${inc.titolo}`);
  }

  async onElimina(inc: Incarico) {
    const confermato = await this.dialogService.chiediConferma(
      'Conferma eliminazione',
      `Sei sicuro di voler eliminare l'incarico "${inc.titolo}"?`
    );
    if (confermato) {
      this.incarichi = this.incarichi.filter(i => i.id !== inc.id);
      alert(`Incarico "${inc.titolo}" eliminato`);
    }
  }
}

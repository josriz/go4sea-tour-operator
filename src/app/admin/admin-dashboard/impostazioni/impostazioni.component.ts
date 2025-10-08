// src/app/admin/admin-dashboard/impostazioni/impostazioni.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-impostazioni',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="impostazioni-page">
      <h2>⚙️ Impostazioni</h2>
      <p>Configura le impostazioni dell'applicazione e del profilo.</p>

      <form (ngSubmit)="onSalva()" class="settings-form">
        <div class="form-group">
          <label>Nome Azienda</label>
          <input type="text" [(ngModel)]="impostazioni.nomeAzienda" name="nomeAzienda" class="form-control" />
        </div>
        <div class="form-group">
          <label>Email Contatto</label>
          <input type="email" [(ngModel)]="impostazioni.emailContatto" name="emailContatto" class="form-control" />
        </div>
        <div class="form-group">
          <label>Telefono</label>
          <input type="text" [(ngModel)]="impostazioni.telefono" name="telefono" class="form-control" />
        </div>
        <div class="form-group">
          <label>Logo (URL)</label>
          <input type="text" [(ngModel)]="impostazioni.logoUrl" name="logoUrl" class="form-control" placeholder="https://..." />
        </div>
        <button type="submit" class="btn btn-save">💾 Salva Impostazioni</button>
      </form>
    </div>
  `,
  styles: [`
    .impostazioni-page {
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h2 { margin-bottom: 15px; color: #333; }
    p { color: #666; margin-bottom: 20px; }
    .settings-form { max-width: 500px; }
    .form-group {
      margin-bottom: 15px;
    }
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: #495057;
    }
    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 0.9rem;
    }
    .btn {
      padding: 10px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
    }
    .btn-save {
      background: #007bff;
      color: white;
    }
  `]
})
export class ImpostazioniComponent {
  impostazioni = {
    nomeAzienda: 'Go4Sea Tour Operator',
    emailContatto: 'info@go4sea.com',
    telefono: '+39 080 1234567',
    logoUrl: ''
  };

  onSalva() {
    alert('Impostazioni salvate con successo!');
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, LoginResponse } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- 
      Il layout responsive è gestito completamente da Bootstrap.
      d-flex: Attiva Flexbox.
      justify-content-center & align-items-center: Centra orizzontalmente e verticalmente.
      vh-100: Altezza 100% del viewport.
      bg-light: Sfondo grigio chiaro.
    -->
    <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
      
      <!-- 
        card: Contenitore moderno con bordi e ombreggiatura.
        p-4: Padding (margine interno) di livello 4.
        shadow-lg: Ombreggiatura grande per un effetto elevato.
        login-box-width: Classe CSS custom per la larghezza massima.
      -->
      <div class="card p-4 shadow-lg login-box-width">
        <h2 class="text-center mb-4 text-primary">Go4Sea Tour Operator</h2>
        
        <form (ngSubmit)="onLogin()">
          
          <!-- Username: Uso delle classi form-floating per un effetto moderno -->
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="username" placeholder="Username" 
                   [(ngModel)]="username" name="username" required>
            <label for="username">Username</label>
          </div>

          <!-- Password: Uso delle classi form-floating -->
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="password" placeholder="Password" 
                   [(ngModel)]="password" name="password" required>
            <label for="password">Password</label>
          </div>
          
          <!-- Ruolo: Uso della classe form-select di Bootstrap -->
          <div class="mb-4">
            <label for="role" class="form-label text-start d-block">Ruolo</label>
            <select class="form-select" id="role" [(ngModel)]="role" name="role" required>
              <option value="ADMIN">Amministratore</option>
              <option value="COLLABORATOR">Collaboratore</option>
            </select>
          </div>

          <!-- Bottone di Login -->
          <!-- btn-primary: Bottone blu Bootstrap. w-100: Larghezza 100%. mt-3: Margine superiore. -->
          <button type="submit" class="btn btn-primary w-100 mt-3" [disabled]="loading">
            {{ loading ? 'Accesso in corso...' : 'Accedi' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    /* Abbiamo ridotto il CSS custom al minimo indispensabile, 
      lasciando che Bootstrap gestisca la maggior parte dello stile.
    */
    .login-box-width {
      /* Larghezza massima limitata, ma completamente fluida (responsive) */
      width: 90%; 
      max-width: 400px;
    }
    
    /* Stile per il titolo - usa un colore primario del brand se disponibile */
    .text-primary {
      color: #007bff !important; /* Colore blu standard Bootstrap */
    }

    /* Override per form-floating se necessario, ma di solito non serve */
    .form-floating > label {
      padding: 1rem 0.75rem;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  role = 'ADMIN';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    this.loading = true;
    try {
      const res: LoginResponse = await this.authService.login(this.username, this.password, this.role);
      // NOTE: L'uso di localStorage per i token è sconsigliato in produzione,
      // andrebbe usato un meccanismo più sicuro come gli HttpOnly cookies.
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', res.username);
      localStorage.setItem('role', res.role);
      this.authService.setLoggedIn(true);
      this.router.navigate(['/admin']);
    } catch (error) {
      // NON USARE 'alert()'. Mostrare un messaggio di errore nell'HTML.
      console.error('Login fallito:', error);
      // Implementa un messaggio di errore visibile nel template (es. una variabile `errorMessage = 'Login fallito...'`)
      this.loading = false;
    }
  }
}

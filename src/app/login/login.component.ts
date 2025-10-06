import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  selectedRole: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Imposta il ruolo selezionato
   * @param role 'admin' o 'collaboratore'
   */
  selectRole(role: string): void {
    this.selectedRole = role;
    console.log('Ruolo selezionato:', this.selectedRole);
  }

  /**
   * Gestisce il tentativo di login
   */
  onLogin(): void {
    console.log('Tentativo di login:', {
      username: this.username,
      password: this.password ? '***' : '',
      selectedRole: this.selectedRole
    });

    if (!this.username || !this.password || !this.selectedRole) {
      alert('Tutti i campi sono obbligatori.');
      return;
    }

    this.authService.login(this.username, this.password, this.selectedRole)
      .subscribe({
        next: (response) => {
          console.log('Login riuscito:', response);

          if (response.role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else if (response.role === 'COLLABORATOR') {
            this.router.navigate(['/collaboratore']);
          } else {
            console.error('Ruolo non riconosciuto:', response.role);
            alert('Errore: ruolo non valido.');
          }
        },
        error: (err) => {
          console.error('Login fallito:', err);
          alert('Accesso negato. Credenziali o ruolo non validi.');
        }
      });
  }
}

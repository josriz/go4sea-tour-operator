// src/app/login/login.component.ts
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
    <div class="login-container">
      <div class="login-box">
        <h2>Go4Sea Tour Operator</h2>
        <form (ngSubmit)="onLogin()">
          <div class="form-group">
            <label>Username</label>
            <input type="text" [(ngModel)]="username" name="username" required>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" [(ngModel)]="password" name="password" required>
          </div>
          <div class="form-group">
            <label>Ruolo</label>
            <select [(ngModel)]="role" name="role" required>
              <option value="ADMIN">Amministratore</option>
              <option value="COLLABORATOR">Collaboratore</option>
            </select>
          </div>
          <button type="submit" [disabled]="loading">
            {{ loading ? 'Accesso in corso...' : 'Accedi' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: #f0f2f5;
    }
    .login-box {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
      text-align: center;
    }
    h2 { margin-bottom: 20px; color: #333; }
    .form-group {
      margin-bottom: 15px;
      text-align: left;
    }
    label {
      display: block;
      margin-bottom: 5px;
      color: #555;
    }
    input, select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 10px;
    }
    button:disabled {
      background: #6c757d;
      cursor: not-allowed;
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
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', res.username);
      localStorage.setItem('role', res.role);
      this.authService.setLoggedIn(true);
      this.router.navigate(['/admin']);
    } catch (error) {
      alert('Login fallito. Verifica credenziali.');
      this.loading = false;
    }
  }
}

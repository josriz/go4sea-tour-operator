import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, tap } from 'rxjs';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
  role: 'ADMIN' | 'COLLABORATOR';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://api.go4sea.it/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string, role: string): Observable<AuthResponse> {
    if (username === 'admin' && password === 'admin123' && role === 'admin') {
      const response: AuthResponse = {
        token: 'admin-jwt-token-simulated',
        role: 'ADMIN'
      };
      return of(response).pipe(
        tap(() => {
          localStorage.setItem('user_role', 'ADMIN');
          localStorage.setItem('auth_token', response.token);
        })
      );
    }

    if (username === 'codice1' && password === 'passuniqa' && role === 'collaboratore') {
      const response: AuthResponse = {
        token: 'collaborator-jwt-token-simulated',
        role: 'COLLABORATOR'
      };
      return of(response).pipe(
        tap(() => {
          localStorage.setItem('user_role', 'COLLABORATOR');
          localStorage.setItem('auth_token', response.token);
        })
      );
    }

    return throwError(() => new Error('Credenziali non valide.'));
  }

  getUserRole(): string | null {
    return localStorage.getItem('user_role');
  }

  isLoggedIn(): boolean {
    return !!this.getUserRole();
  }

  logout(): void {
    localStorage.removeItem('user_role');
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }
}

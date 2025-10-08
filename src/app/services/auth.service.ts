// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface LoginResponse {
  token: string;
  username: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router) {
    this.loggedIn.next(!!localStorage.getItem('token'));
  }

  login(username: string, password: string, role: string): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      if ((username === 'admin' && password === 'admin123' && role === 'ADMIN') ||
          (username === 'user' && password === 'user123' && role === 'COLLABORATOR')) {
        const token = 'fake-jwt-token';
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);
        this.loggedIn.next(true);
        resolve({ token, username, role });
      } else {
        reject('Credenziali non valide');
      }
    });
  }

  logout() {
    localStorage.clear();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }
}

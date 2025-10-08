// src/app/role-auth-guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // 1. Controlla se c'è un token
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // 2. Verifica se il token è scaduto
    const payload = this.parseJwt(token);
    if (payload && payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      this.router.navigate(['/login']);
      return false;
    }

    // 3. Controlla il ruolo, se richiesto
    const expectedRole = next.data['role'];
    const userRole = localStorage.getItem('role');

    if (expectedRole && userRole !== expectedRole) {
      // Se l'utente non ha il ruolo richiesto, reindirizza al dashboard base
      this.router.navigate(['/dashboard']);
      return false;
    }

    // Tutto ok: utente autenticato e con ruolo corretto
    return true;
  }

  // Decodifica il payload del JWT
  private parseJwt(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Errore nella decodifica del token JWT', e);
      return null;
    }
  }
}

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

    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const payload = this.parseJwt(token);
    if (payload && payload.exp < Date.now() / 1000) {
      localStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRole = next.data['role'];
    const userRole = localStorage.getItem('role');

    if (expectedRole && userRole !== expectedRole) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }

  private parseJwt(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
}

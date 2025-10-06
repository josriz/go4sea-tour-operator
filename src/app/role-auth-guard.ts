// src/app/role-auth-guard.ts - DEFINITIVO

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const roleAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const userRole = authService.getUserRole();
  const requiredRole = route.data['role'] as string; 

  // 1. Controllo Autenticazione
  if (!userRole) {
    authService.logout(); 
    return router.createUrlTree(['/']); 
  }

  // 2. Controllo Autorizzazione (Ruolo)
  if (requiredRole && userRole !== requiredRole) {
    console.warn(`Accesso negato: Ruolo ${userRole} non autorizzato per ${requiredRole}.`);
    return router.createUrlTree(['/']); 
  }
  
  // Accesso consentito
  return true;
};
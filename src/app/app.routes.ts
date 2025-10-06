// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { RoleAuthGuard } from './role-auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [RoleAuthGuard]
  },
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [RoleAuthGuard],
    data: { role: 'admin' }
  },
  {
    path: 'admin/users',
    loadComponent: () => import('./admin-dashboard/users/user-management.component').then(m => m.UserManagementComponent),
    canActivate: [RoleAuthGuard],
    data: { role: 'admin' }
  },
  {
    path: 'admin/users/add',
    loadComponent: () => import('./admin-dashboard/add-user/add-user.component').then(m => m.AddUserComponent),
    canActivate: [RoleAuthGuard],
    data: { role: 'admin' }
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

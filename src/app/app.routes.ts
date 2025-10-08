// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ClientManagementComponent } from './admin/admin-dashboard/client-management/client-management.component';
import { IncarichiComponent } from './admin/admin-dashboard/incarichi/incarichi.component';
import { ReportComponent } from './admin/admin-dashboard/report/report.component';
import { ImpostazioniComponent } from './admin/admin-dashboard/impostazioni/impostazioni.component';
import { CollaboratoreDashboardComponent } from './admin/admin-dashboard/collaboratore-dashboard/collaboratore-dashboard.component';
import { RoleAuthGuard } from './guards/role-auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [RoleAuthGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'clienti', component: ClientManagementComponent },
      { path: 'incarichi', component: IncarichiComponent },
      { path: 'report', component: ReportComponent },
      { path: 'impostazioni', component: ImpostazioniComponent },
      { path: 'collaboratori', component: CollaboratoreDashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

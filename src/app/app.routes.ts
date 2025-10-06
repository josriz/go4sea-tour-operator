import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CollaboratoreDashboardComponent } from './collaboratore-dashboard/collaboratore-dashboard.component';
import { roleAuthGuard } from './role-auth-guard';

// Importazioni Utenti
import { UserManagementComponent } from './admin-dashboard/user-management/user-management';
import { AddUserComponent } from './admin-dashboard/add-user/add-user.component';

// Importazioni NUOVI Componenti (usano il nome della classe corretto)
import { ClientManagementComponent } from './admin-dashboard/client-management/client-management.component';
import { PropertyManagementComponent } from './admin-dashboard/property-management/property-management.component';
import { BookingManagementComponent } from './admin-dashboard/booking-management/booking-management.component'; // ← Import aggiunto

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [roleAuthGuard],
    data: { role: 'ADMIN' },
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },

      { path: 'users', component: UserManagementComponent },
      { path: 'users/add', component: AddUserComponent },
      { path: 'users/edit/:id', component: AddUserComponent },

      { path: 'clients', component: ClientManagementComponent },
      { path: 'properties', component: PropertyManagementComponent },
      { path: 'reservations', component: BookingManagementComponent } // ← Rotta aggiunta
    ]
  },

  {
    path: 'collaboratore',
    component: CollaboratoreDashboardComponent,
    canActivate: [roleAuthGuard],
    data: { role: 'COLLABORATOR' }
  },

  { path: '**', redirectTo: '' }
];

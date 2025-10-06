// src/app/collaboratore-dashboard/collaboratore-dashboard.component.ts - DEFINITIVO

import { Component } from '@angular/core';

@Component({
  selector: 'app-collaboratore-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './collaboratore-dashboard.component.html',
  styleUrl: './collaboratore-dashboard.component.css'
})
export class CollaboratoreDashboardComponent {
  username: string = 'Andrea Rossi'; 
}
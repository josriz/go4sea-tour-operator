import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Questo file è un layout per la sezione amministrativa, quindi gestisce la struttura
// di navigazione laterale, header e contenuto principale.

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule // Necessario per l'elemento <router-outlet> e per routerLink
  ],
  template: `
    <!-- Contenitore principale flessibile per l'intera app Admin -->
    <div class="admin-main-wrapper">
      
      <!-- SIDEBAR (Navigazione Laterale) -->
      <div class="admin-sidebar">
        <!-- Contenitore Logo -->
        <div class="logo-container">
          <!-- ORA UTILIZZIAMO IL PERCORSO ASSOLUTO STANDARD '/assets/logo.png' -->
          <img src="/assets/logo.png" 
               alt="Go4Sea Logo" 
               class="sidebar-logo"
               onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;250&quot; height=&quot;65&quot; viewBox=&quot;0 0 250 65&quot;><rect fill=&quot;#39c8c8&quot; width=&quot;250&quot; height=&quot;65&quot;/><text x=&quot;125&quot; y=&quot;38&quot; font-family=&quot;Inter, sans-serif&quot; font-size=&quot;18&quot; font-weight=&quot;bold&quot; fill=&quot;#00477e&quot; text-anchor=&quot;middle&quot;>LOGO MANCANTE</text></svg>';">
        </div>
        <nav>
          <ul class="nav-list">
            <!-- Link Dashboard -->
            <li routerLink="/admin/dashboard" routerLinkActive="active-link">
              Dashboard
            </li>
            <!-- Link Clienti -->
            <li routerLink="/admin/clienti" routerLinkActive="active-link">
              Clienti
            </li>
            <!-- Link Incarichi -->
            <li routerLink="/admin/incarichi" routerLinkActive="active-link">
              Incarichi
            </li>
            <!-- Link Report -->
            <li routerLink="/admin/report" routerLinkActive="active-link">
              Report
            </li>
            <!-- Link Collaboratori -->
            <li routerLink="/admin/collaboratori" routerLinkActive="active-link">
              Collaboratori
            </li>
            <!-- Link Impostazioni -->
            <li routerLink="/admin/impostazioni" routerLinkActive="active-link">
              Impostazioni
            </li>
          </ul>
        </nav>
      </div>
      
      <!-- Contenitore del Contenuto Principale (Header + Rotte) -->
      <div class="main-content-area">
        
        <!-- Header (Navbar) -->
        <header class="admin-header">
            <h1 class="app-title">Pannello di Amministrazione</h1>
        </header>

        <!-- Contenitore per le Pagine Routing (ad esempio, client-management o incarichi) -->
        <div class="page-container">
          <!-- Qui viene caricato il contenuto del componente della rotta attiva -->
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Stili base per un layout completo e responsive */
    :host {
      display: block;
      height: 100%;
      width: 100%;
      font-family: 'Inter', sans-serif;
    }

    .admin-main-wrapper {
      display: flex; /* Abilita flexbox per il layout Sidebar + Main Content */
      min-height: 100vh; 
      width: 100%;
      background-color: #f4f6f9; /* Sfondo del corpo leggero */
    }
    
    /* Stili per la Sidebar - TEMA MARINO */
    .admin-sidebar {
        width: 250px; 
        background-color: #00477e; /* Blu Oceano Profondo */
        color: white;
        padding: 20px 15px;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
        flex-shrink: 0; 
        text-align: center; 
    }
    
    /* Nuovo stile per il contenitore del logo */
    .logo-container {
        padding: 0 10px 20px 10px; 
        margin-bottom: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2); 
    }

    /* Nuovo stile per l'immagine del logo */
    .sidebar-logo {
        max-width: 100%; 
        height: auto;
        max-height: 65px; 
        display: block;
        margin: 0 auto;
    }
    
    .sidebar-title {
        display: none; 
    }
    
    .nav-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .nav-list li {
        padding: 12px 15px;
        margin-bottom: 8px;
        cursor: pointer;
        border-radius: 6px;
        transition: background-color 0.2s, color 0.2s;
        font-size: 0.95rem;
        font-weight: 500;
        text-decoration: none; 
        color: #e9ecef;
    }
    /* Stile per l'elemento attivo - Acqua Marina Brillante */
    .nav-list li.active-link {
        background-color: #ffffff; 
        color: #39c8c8; /* Acqua Marina */
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        font-weight: 700;
    }
    /* Hover - Blu leggermente più scuro */
    .nav-list li:hover:not(.active-link) {
        background-color: #00335c; /* Blu più scuro al passaggio del mouse */
        color: white;
    }

    /* Stili per l'Header */
    .admin-header {
        background-color: #ffffff;
        padding: 15px 30px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        border-bottom: 1px solid #dee2e6;
        flex-shrink: 0;
    }
    
    .app-title {
        margin: 0;
        font-size: 1.5rem;
        color: #343a40;
    }


    /* Contenuto Principale */
    .main-content-area {
      flex-grow: 1; 
      display: flex;
      flex-direction: column;
      overflow-x: hidden; 
    }

    .page-container {
      padding: 30px; 
      flex-grow: 1; 
      overflow-y: auto; 
    }

    /* Media query per un layout mobile/tablet */
    @media (max-width: 992px) {
      .admin-main-wrapper {
        flex-direction: column; 
      }
      .admin-sidebar {
        width: 100%; 
        height: auto;
        padding: 10px 0;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      }
      .sidebar-title {
          display: none; 
      }
      .nav-list {
          display: flex; 
          justify-content: space-around;
      }
      .nav-list li {
          flex-grow: 1;
          text-align: center;
          margin: 0 4px;
          padding: 8px;
      }
      .page-container {
          padding: 15px; 
      }
    }
  `]
})
export class AdminLayoutComponent {}

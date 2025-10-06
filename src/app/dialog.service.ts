import { Injectable, signal } from '@angular/core';

// Interfaccia per gestire lo stato del modale
export interface DialogConfig {
  titolo: string;
  messaggio: string;
  risolvi?: (confermato: boolean) => void;
}

/**
 * Servizio per mostrare e gestire i modali di conferma in modo asincrono.
 * I componenti figli iniettano questo servizio per richiedere una conferma.
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  // Lo stato del modale è gestito tramite signal e letto dal DialogModalComponent
  dialogState = signal<DialogConfig | null>(null);

  /**
   * Mostra un modale di conferma e restituisce una Promise.
   * La Promise si risolve in 'true' se confermato, 'false' se annullato.
   */
  chiediConferma(titolo: string, messaggio: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.dialogState.set({
        titolo,
        messaggio,
        risolvi: resolve // La funzione di risoluzione della Promise
      });
    });
  }

  /**
   * Chiude il modale e risolve la Promise.
   */
  risolvi(confermato: boolean): void {
    const config = this.dialogState();
    if (config && config.risolvi) {
      config.risolvi(confermato);
    }
    this.dialogState.set(null);
  }
}

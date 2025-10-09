import { Injectable, signal } from '@angular/core';

// Interfaccia che definisce il contenuto e il tipo del dialog, ESPOSTA correttamente.
export interface DialogContent {
  title: string;
  message: string;
  type: 'alert' | 'confirm'; // 'alert' ha solo il bottone OK, 'confirm' ha Annulla/Conferma
  confirmText?: string; // Testo personalizzato per il bottone di conferma
}

// Interfaccia che tiene traccia del contenuto e della Promise in sospeso
interface ActiveDialog {
  content: DialogContent;
  // Funzione per risolvere la Promise (true = confermato, false = annullato)
  resolver: (value: boolean) => void; 
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  // Stato gestito tramite Signal per la reattività
  private activeDialog = signal<ActiveDialog | null>(null);

  // Metodo isDialogOpen(): Correttamente esposto come funzione che restituisce un booleano.
  isDialogOpen = () => this.activeDialog() !== null;
  
  // Metodo dialogContent(): Correttamente esposto come funzione che restituisce il contenuto.
  dialogContent = () => this.activeDialog()?.content;

  /**
   * Apre un dialog modale con una Promise.
   * @param content Il contenuto del dialog.
   * @returns Una Promise che si risolve con true (Conferma) o false (Annulla/Chiusura).
   */
  openDialog(content: DialogContent): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.activeDialog.set({
        content: content,
        resolver: resolve // Memorizziamo la funzione resolve per risolverla in closeDialog
      });
    });
  }

  /**
   * Chiude il dialog e risolve la Promise.
   * @param result Il risultato da passare alla Promise (true/false).
   */
  // Metodo closeDialog(): Correttamente esposto.
  closeDialog(result: boolean = false): void {
    const dialog = this.activeDialog();
    if (dialog) {
      dialog.resolver(result); // Risolve la Promise
      this.activeDialog.set(null); // Chiude il dialog
    }
  }

  // === METODI HELPER UFFICIALI (inglese) ===
  showAlert(title: string, message: string, confirmText: string = 'OK'): Promise<boolean> {
    return this.openDialog({ title, message, type: 'alert', confirmText });
  }

  showConfirm(title: string, message: string, confirmText: string = 'Conferma'): Promise<boolean> {
    return this.openDialog({ title, message, type: 'confirm', confirmText });
  }

  // === ALIAS PER RETROCOMPATIBILITÀ (italiano) ===
  /**
   * Alias per showAlert per retrocompatibilità con componenti che usano 'mostraMessaggio'.
   */
  mostraMessaggio(title: string, message: string, confirmText: string = 'OK'): Promise<boolean> {
    return this.showAlert(title, message, confirmText);
  }

  /**
   * Alias per showConfirm per retrocompatibilità con componenti che usano 'chiediConferma'.
   */
  chiediConferma(title: string, message: string, confirmText: string = 'Conferma'): Promise<boolean> {
    return this.showConfirm(title, message, confirmText);
  }
}

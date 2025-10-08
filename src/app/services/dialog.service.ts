// src/app/services/dialog.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  chiediConferma(titolo: string, messaggio: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const conferma = window.confirm(`${titolo}\n\n${messaggio}`);
      resolve(conferma);
    });
  }
}

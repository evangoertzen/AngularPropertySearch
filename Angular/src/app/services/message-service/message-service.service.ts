import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  showError(message: string){
    this.snackBar.open(message, undefined, {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  showSuccess(message: string){
    this.snackBar.open(message, undefined, {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
}

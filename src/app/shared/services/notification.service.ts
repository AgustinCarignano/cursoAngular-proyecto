import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  public showNotification(message: string): void {
    this.snackBar.open(message, 'ACEPTAR', {
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}

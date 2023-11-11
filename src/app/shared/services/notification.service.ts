import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  public showNotification(message: string): Observable<MatSnackBarDismiss> {
    return this.snackBar
      .open(message, 'ACEPTAR', {
        verticalPosition: 'top',
        duration: 2000,
      })
      .afterDismissed();
  }
}

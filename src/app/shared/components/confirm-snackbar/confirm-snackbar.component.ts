import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-snackbar',
  templateUrl: './confirm-snackbar.component.html',
  styleUrls: ['./confirm-snackbar.component.scss'],
})
export class ConfirmSnackbarComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmSnackbarComponent>) {}

  public closeDialog(data: boolean): void {
    this.dialogRef.close(data);
  }
}

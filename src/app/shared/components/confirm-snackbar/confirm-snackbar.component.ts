import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  title?: string;
}

@Component({
  selector: 'app-confirm-snackbar',
  templateUrl: './confirm-snackbar.component.html',
  styleUrls: ['./confirm-snackbar.component.scss'],
})
export class ConfirmSnackbarComponent {
  @Input() title = 'Confirm delete?';
  constructor(
    private dialogRef: MatDialogRef<ConfirmSnackbarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {
    if (this.data && this.data.title) {
      this.title = this.data.title;
    }
  }

  public closeDialog(data: boolean): void {
    this.dialogRef.close(data);
  }
}

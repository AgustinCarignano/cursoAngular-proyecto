import { Component, Inject } from '@angular/core';
import { AlumnForm } from '../../models/alumns-form.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlumnDialog } from '../../models/dialog-data.model';
import { Alumn } from '../../models/alumn.model';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-alumns-form',
  templateUrl: './alumns-form.component.html',
  styleUrls: ['./alumns-form.component.scss'],
})
export class AlumnsFormComponent {
  public title: string = '';
  public form = new AlumnForm().form;
  constructor(
    private dialogRef: MatDialogRef<AlumnsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: AlumnDialog
  ) {
    this.title = this.data.title;
    if (this.data.alumn) {
      this.form.patchValue(this.data.alumn);
    }
  }

  public closeDialog(data?: Partial<Alumn>): void {
    this.dialogRef.close(data);
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const newData = this.form.value as Partial<Alumn>;
    if (this.data.alumn) {
      this.closeDialog({ ...newData, id: this.data.alumn.id });
    } else {
      this.closeDialog(newData);
    }
  }

  public getControlError(control: string): ValidationErrors | null {
    return this.form.get(control)?.errors || null;
  }
}

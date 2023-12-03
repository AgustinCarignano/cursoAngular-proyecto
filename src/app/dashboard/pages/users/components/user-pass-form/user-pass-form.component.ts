import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  UserPassForm,
  UserPassFormControls,
} from '../../models/user-pass-form.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.model';
import { UserPassDialogData } from '../../models/user-pass-form-data-model';

@Component({
  selector: 'app-user-pass-form',
  templateUrl: './user-pass-form.component.html',
  styleUrls: ['./user-pass-form.component.scss'],
})
export class UserPassFormComponent {
  public form: FormGroup<UserPassFormControls>;
  public hidePass = true;
  public hideRepeatPass = true;

  constructor(
    private dialogRef: MatDialogRef<UserPassFormComponent, User>,
    @Inject(MAT_DIALOG_DATA) private data: UserPassDialogData
  ) {
    this.form = new UserPassForm().form;
  }

  public submitForm(): void {
    const { password, repeatPassword } = this.form.getRawValue();
    if (this.form.invalid || !password || !repeatPassword) {
      return this.form.markAllAsTouched();
    }
    if (password !== repeatPassword) {
      this.form.controls['repeatPassword'].setErrors({ repeat: true });
    } else {
      this.dialogRef.close({ ...this.data.user, password });
    }
  }
}

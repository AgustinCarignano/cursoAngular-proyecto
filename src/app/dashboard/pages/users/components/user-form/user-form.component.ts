import { Component, Inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserForm, UserFormControls } from '../../models/user-form.model';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserDialogData } from '../../models/user-form-data.model';
import { UserRole } from '../../enums/user-role.enum';
import { User } from '../../models/user.model';

interface roleOption {
  value: UserRole;
  viewValue: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  public form: FormGroup<UserFormControls>;
  public roles: roleOption[] = [
    { value: UserRole.ADMIN, viewValue: 'Administrador' },
    { value: UserRole.EMPLOYEE, viewValue: 'Employee' },
  ];
  @Input() title = '';
  public showPassField = true;

  constructor(
    private dialogRef: MatDialogRef<
      UserFormComponent,
      Partial<User> | undefined
    >,
    @Inject(MAT_DIALOG_DATA) private data: UserDialogData
  ) {
    this.form = new UserForm().form;
    if (this.data) {
      this.title = this.data.title;
      if (this.data.user) {
        this.showPassField = false;
        this.form.patchValue(this.data.user);
      }
    }
  }

  public submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let userData = this.form.getRawValue() as Partial<User>;
    if (this.data.user) {
      userData = { ...userData, id: this.data.user.id };
      delete userData.password;
    }
    this.dialogRef.close(userData);
  }
}

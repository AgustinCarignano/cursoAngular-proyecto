import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRole } from '../enums/user-role.enum';

export interface UserFormControls {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  role: FormControl<UserRole | null>;
}

export class UserForm {
  private firstName = new FormControl('', [Validators.required]);
  private lastName = new FormControl('', [Validators.required]);
  private email = new FormControl('', [Validators.required, Validators.email]);
  private password = new FormControl('', [Validators.required]);
  private role = new FormControl<UserRole>(UserRole.EMPLOYEE, [
    Validators.required,
  ]);
  public form: FormGroup<UserFormControls>;

  constructor() {
    this.form = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      role: this.role,
    });
  }
}

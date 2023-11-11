import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface RegisterFormControls {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export class RegisterForm {
  private firstName = new FormControl('', [Validators.required]);
  private lastName = new FormControl('', [Validators.required]);
  private email = new FormControl('', [Validators.required, Validators.email]);
  private password = new FormControl('', [Validators.required]);
  public form: FormGroup<RegisterFormControls>;

  constructor() {
    this.form = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    });
  }
}

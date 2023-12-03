import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface UserPassFormControls {
  password: FormControl<string | null>;
  repeatPassword: FormControl<string | null>;
}

export class UserPassForm {
  private password = new FormControl('', [Validators.required]);
  private repeatPassword = new FormControl('', [Validators.required]);
  public form: FormGroup<UserPassFormControls>;

  constructor() {
    this.form = new FormGroup({
      password: this.password,
      repeatPassword: this.repeatPassword,
    });
  }
}

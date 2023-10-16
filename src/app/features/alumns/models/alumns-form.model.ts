import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Alumn } from './alumn.model';

export interface AlumnFormControls {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  birthdate: FormControl<Date | null>;
  dni: FormControl<string | null>;
  email: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  country: FormControl<string | null>;
  province: FormControl<string | null>;
  city: FormControl<string | null>;
}

export class AlumnForm {
  private firstName = new FormControl('', [Validators.required]);
  private lastName = new FormControl('', [Validators.required]);
  private birthdate: FormControl<Date | null> = new FormControl(null, [
    Validators.required,
  ]);
  private dni = new FormControl('', [
    Validators.required,
    Validators.minLength(7),
    Validators.maxLength(8),
  ]);
  private email = new FormControl('', [Validators.required, Validators.email]);
  private phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(9),
    Validators.maxLength(14),
  ]);
  private country = new FormControl('', [Validators.required]);
  private province = new FormControl('', [Validators.required]);
  private city = new FormControl('', [Validators.required]);
  public form: FormGroup<AlumnFormControls>;

  constructor(data?: Alumn) {
    this.form = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      birthdate: this.birthdate,
      dni: this.dni,
      email: this.email,
      phoneNumber: this.phoneNumber,
      country: this.country,
      province: this.province,
      city: this.city,
    });
    if (data) this.form.patchValue(data);
  }
}

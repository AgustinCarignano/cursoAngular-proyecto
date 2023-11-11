import { Component } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import {
  RegisterForm,
  RegisterFormControls,
} from '../models/register-form.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public form: FormGroup<RegisterFormControls>;

  constructor(private authService: AuthService) {
    this.form = new RegisterForm().form;
  }

  onRegister(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    this.authService.register(this.form.getRawValue());
  }

  public getControlError(control: string): ValidationErrors | null {
    return this.form.get(control)?.errors || null;
  }
}

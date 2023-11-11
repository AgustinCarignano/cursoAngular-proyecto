import { Component } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { LoginForm, LoginFormControls } from '../models/login-form.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public form: FormGroup<LoginFormControls>;

  constructor(private authsrevice: AuthService) {
    this.form = new LoginForm({
      email: 'admin@admin.com',
      password: 'admin12345',
    }).form;
  }

  public onLogin(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    this.authsrevice.login(this.form.getRawValue());
  }

  public getControlError(control: string): ValidationErrors | null {
    return this.form.get(control)?.errors || null;
  }
}

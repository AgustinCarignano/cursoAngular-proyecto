import { Component } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { LoginForm, LoginFormControls } from '../models/login-form.model';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public form: FormGroup<LoginFormControls>;

  constructor(private store: Store) {
    this.form = new LoginForm().form;
  }

  public onLogin(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    return this.store.dispatch(
      AuthActions.loginUser({ data: this.form.getRawValue() })
    );
  }

  public getControlError(control: string): ValidationErrors | null {
    return this.form.get(control)?.errors || null;
  }

  public autoComplete(role: 'admin' | 'employee'): void {
    if (role === 'admin') {
      this.form.patchValue({
        email: 'admin@admin.com',
        password: 'admin12345',
      });
    } else {
      this.form.patchValue({
        email: 'juan.lopez@eployee.com',
        password: 'employee12345',
      });
    }
  }
}

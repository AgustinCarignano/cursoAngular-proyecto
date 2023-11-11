import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginRequest } from '../models/auth-user.model';

describe('LoginComponent', () => {
  const mockUser: LoginRequest = {
    email: 'email@email.com',
    password: 'abc123',
  };
  let loginComponent: LoginComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [LoginComponent],
    });
    loginComponent = TestBed.createComponent(LoginComponent).componentInstance;
  });

  it('Should create the component', () => {
    expect(loginComponent).toBeTruthy();
  });

  it('Should mark all login form fields as touched when there is an error in the form', () => {
    loginComponent.form.patchValue({
      email: 'noEmail',
      password: '',
    });
    loginComponent.onLogin();
    const emailControl = loginComponent.form.get('email');
    const passwordControl = loginComponent.form.get('password');
    expect(emailControl?.touched).toBeTrue();
    expect(passwordControl?.touched).toBeTrue();
  });

  it('Should call login method from authService', () => {
    loginComponent.form.patchValue(mockUser);
    const spyOnAuthServiceLogin = spyOn(loginComponent['authService'], 'login');
    loginComponent.onLogin();
    expect(spyOnAuthServiceLogin).toHaveBeenCalled();
  });

  it('Should send the correct user information to login method', () => {
    loginComponent.form.patchValue(mockUser);
    const spyOnAuthServiceLogin = spyOn(loginComponent['authService'], 'login');
    loginComponent.onLogin();
    expect(spyOnAuthServiceLogin).toHaveBeenCalledWith(mockUser);
  });
});

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterRequest } from '../models/auth-user.model';

describe('RegisterComponent', () => {
  const mockUser: RegisterRequest = {
    email: 'email@email.com',
    password: 'abc123',
    firstName: 'testing',
    lastName: 'register',
  };
  let registerComponent: RegisterComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [RegisterComponent],
    });
    registerComponent =
      TestBed.createComponent(RegisterComponent).componentInstance;
  });

  it('Should create the component', () => {
    expect(registerComponent).toBeTruthy();
  });

  it('Should mark all register form fields as touched when there is an error in the form', () => {
    registerComponent.form.patchValue({
      email: 'noEmail',
      password: '13245',
    });
    registerComponent.onRegister();

    const emailControl = registerComponent.form.get('email');
    const passwordControl = registerComponent.form.get('password');
    const firstName = registerComponent.form.get('firstName');
    const lastName = registerComponent.form.get('lastName');

    expect(emailControl?.touched).toBeTrue();
    expect(passwordControl?.touched).toBeTrue();
    expect(firstName?.touched).toBeTrue();
    expect(lastName?.touched).toBeTrue();
  });

  it('Should call register method from authService', () => {
    registerComponent.form.patchValue(mockUser);
    const spyOnAuthServiceLogin = spyOn(
      registerComponent['authService'],
      'register'
    );
    registerComponent.onRegister();
    expect(spyOnAuthServiceLogin).toHaveBeenCalled();
  });

  it('Should send the correct user information to register method', () => {
    registerComponent.form.patchValue(mockUser);
    const spyOnAuthServiceLogin = spyOn(
      registerComponent['authService'],
      'register'
    );
    registerComponent.onRegister();
    expect(spyOnAuthServiceLogin).toHaveBeenCalledWith(mockUser);
  });
});

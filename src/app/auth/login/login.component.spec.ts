import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginRequest } from '../models/auth-user.model';
import { AuthActions, State as LoginState, initialState } from '../store';
import { PublicUser } from 'src/app/dashboard/pages/users/models/user.model';
import { UserRole } from 'src/app/dashboard/pages/users/enums/user-role.enum';

describe('LoginComponent', () => {
  const mockUser: LoginRequest = {
    email: 'email@email.com',
    password: 'abc123',
  };
  const publicMockUser: PublicUser = {
    email: 'admin@admin.com',
    firstName: 'Agustin',
    lastName: 'Carignano',
    role: UserRole.ADMIN,
    id: 2,
  };
  let loginComponent: LoginComponent;
  let store: MockStore<LoginState>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [LoginComponent],
      providers: [provideMockStore({ initialState })],
    });
    store = TestBed.inject(MockStore);
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

  it('Should dispatch the loginUser action', () => {
    loginComponent.form.patchValue(mockUser);
    const spyOnDispatch = spyOn(store, 'dispatch').and.callThrough();
    loginComponent.onLogin();
    expect(spyOnDispatch).toHaveBeenCalled();
  });

  it('Should send the correct user information to loginUser action', () => {
    loginComponent.form.patchValue(mockUser);
    const spyOnDispatch = spyOn(store, 'dispatch').and.callThrough();
    loginComponent.onLogin();
    expect(spyOnDispatch).toHaveBeenCalledWith(
      AuthActions.loginUser({ data: mockUser })
    );
  });
});

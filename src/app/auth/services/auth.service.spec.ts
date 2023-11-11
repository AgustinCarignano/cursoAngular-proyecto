import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  RouterTestingHarness,
  RouterTestingModule,
} from '@angular/router/testing';
import { MockProvider } from 'ng-mocks';
import { Router } from '@angular/router';
import { User } from 'src/app/dashboard/pages/users/models/user.model';
import { UserRole } from 'src/app/dashboard/pages/users/enums/user-role.enum';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../models/auth-user.model';
import { environment } from 'src/environments/environment.local';
import { Paths } from 'src/app/dashboard/enums/paths.enum';

describe('AuthService', () => {
  const mockAuthResopnse: AuthResponse = {
    accessToken: 'lkasialmknsfdasf',
    user: {
      id: 1,
      email: 'admin@admin.com',
      password: 'someTokenizadePassword',
      firstName: 'fakeName',
      lastName: 'fakeSurname',
      role: UserRole.EMPLOYEE,
    },
  };
  const loginDataMock: LoginRequest = {
    email: 'admin@MatListItem.com',
    password: '12345',
  };
  const registerDataMock: RegisterRequest = {
    email: 'admin@admin.com',
    password: 'admin123',
    firstName: 'fakeName',
    lastName: 'fakeSurname',
  };
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [MockProvider(Router)],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should record the user information when the register method is called and navigate to dashboard path', () => {
    let spyOnRouterNavigate = spyOn(service['router'], 'navigate');
    service.register(registerDataMock);
    httpController
      .expectOne({
        url: environment.baseUrl + '/register',
        method: 'POST',
      })
      .flush(mockAuthResopnse);

    service.localStorageInfo.subscribe({
      next: (data) => {
        expect(data).toEqual({
          accessToken: mockAuthResopnse.accessToken,
          user: { email: mockAuthResopnse.user.email },
        });
        expect(spyOnRouterNavigate).toHaveBeenCalledWith([Paths.DASHBOARD]);
      },
    });
  });

  it('Should record the user information when the login method is called and navigate to dashboard path', () => {
    let spyOnRouterNavigate = spyOn(service['router'], 'navigate');
    service.login(loginDataMock);
    httpController
      .expectOne({
        url: environment.baseUrl + '/login',
        method: 'POST',
      })
      .flush(mockAuthResopnse);

    service.localStorageInfo.subscribe({
      next: (data) => {
        expect(data).toEqual({
          accessToken: mockAuthResopnse.accessToken,
          user: { email: mockAuthResopnse.user.email },
        });
        expect(spyOnRouterNavigate).toHaveBeenCalledWith([Paths.DASHBOARD]);
      },
    });
  });

  it('Should record a null value when call logout method', () => {
    service.logout();

    service.localStorageInfo.subscribe({
      next: (data) => {
        expect(data).toBe(null);
      },
    });
  });
});

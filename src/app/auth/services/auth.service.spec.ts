import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProvider } from 'ng-mocks';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/dashboard/pages/users/enums/user-role.enum';
import { AuthResponse, LoginRequest } from '../models/auth-user.model';
import { environment } from 'src/environments/environment.local';
import { Paths } from 'src/app/dashboard/enums/paths.enum';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { State as LoginState, initialState } from '../store';

describe('AuthService', () => {
  const mockAuthResponse: AuthResponse = {
    accessToken: 'lkasialmknsfdasf',
    user: {
      id: 1,
      email: 'admin@admin.com',
      firstName: 'fakeName',
      lastName: 'fakeSurname',
      role: UserRole.EMPLOYEE,
    },
  };
  const loginDataMock: LoginRequest = {
    email: 'admin@MatListItem.com',
    password: '12345',
  };
  let service: AuthService;
  let store: MockStore<LoginState>;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [MockProvider(Router), provideMockStore({ initialState })],
    });
    service = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should navigate to dashboard path when the login method is called with a valid user', () => {
    let spyOnRouterNavigate = spyOn(service['router'], 'navigate');
    service.login(loginDataMock);
    httpController
      .expectOne({
        url: environment.baseUrl + '/login',
        method: 'POST',
      })
      .flush(mockAuthResponse);
    expect(spyOnRouterNavigate).toHaveBeenCalledWith([Paths.DASHBOARD]);
  });

  it('should set the authResponse in the localStorage when login is success', () => {
    service.login(loginDataMock);
    httpController
      .expectOne({
        url: environment.baseUrl + '/login',
        method: 'POST',
      })
      .flush(mockAuthResponse);
    expect(JSON.parse(localStorage.getItem('loggedUser') || '')).toEqual(
      mockAuthResponse
    );
  });

  it('should clean the localStorage when call logout method', () => {
    service.logout();
    expect(localStorage.getItem('loggedUser')).toBe(null);
  });
});

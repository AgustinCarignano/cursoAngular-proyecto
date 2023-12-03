import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap, throwIfEmpty } from 'rxjs';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../models/auth-user.model';
import { UserRole } from 'src/app/dashboard/pages/users/enums/user-role.enum';
import { Router } from '@angular/router';
import { Paths } from 'src/app/dashboard/enums/paths.enum';
import { User } from 'src/app/dashboard/pages/users/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly storageName = 'loggedUser';
  private base_url = 'http://localhost:3000';
  private _localStorageInfo: BehaviorSubject<AuthResponse | null> =
    new BehaviorSubject<AuthResponse | null>(null);
  public localStorageInfo: Observable<AuthResponse | null> =
    this._localStorageInfo.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  public storeLogin(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.base_url}/login`, data)
      .pipe(tap((resp) => this.openSession(resp)));
  }

  public checkStoredInfo(): Observable<AuthResponse | null> {
    const item = localStorage.getItem(this.storageName);
    if (!item) return of(null);
    const data: AuthResponse = JSON.parse(item);
    return this.http
      .get<User[]>(`${this.base_url}/${Paths.USERS}?email=${data.user.email}`, {
        headers: {
          Authorization: 'Bearer ' + data.accessToken,
        },
      })
      .pipe(map(() => data));
  }

  public login(data: LoginRequest): void {
    this.http.post<AuthResponse>(`${this.base_url}/login`, data).subscribe({
      next: (resp) => this.openSession(resp),
      error: (err) => console.log(err),
    });
  }

  public register(data: RegisterRequest): void {
    this.http
      .post<AuthResponse>(`${this.base_url}/register`, {
        ...data,
        role: UserRole.EMPLOYEE,
      })
      .subscribe({
        next: (resp) => this.openSession(resp),
        error: (err) => console.log(err),
      });
  }

  public logout(): void {
    this.destroySession();
    this.router.navigate(['', Paths.AUTH]);
  }

  public getLoggedUser(): Observable<User> {
    const data = this._localStorageInfo.getValue();
    return this.http
      .get<User[]>(
        `${this.base_url}/${Paths.USERS}?email=${data?.user.email}`,
        {
          headers: {
            Authorization: 'Bearer ' + data?.accessToken,
          },
        }
      )
      .pipe(map((users) => users[0]));
  }

  public getTokenvalue(): string {
    return localStorage.getItem(this.storageName) || '';
  }

  private openSession(info: AuthResponse): void {
    localStorage.setItem(this.storageName, JSON.stringify(info));
    this.router.navigate([Paths.DASHBOARD]);
  }

  private checkSession(): void {
    const item = localStorage.getItem(this.storageName);
    if (item) {
      this.openSession(JSON.parse(item));
      this.getLoggedUser().subscribe({
        error: (err) => {
          if (err.status === 401) {
            this.destroySession();
          }
        },
      });
    }
  }

  private destroySession(): void {
    localStorage.removeItem(this.storageName);
  }
}

import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap, concatMap, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ErrorService } from './error.service';

export abstract class HttpService<T> {
  protected _http: HttpClient;
  protected authService: AuthService;
  protected errorService: ErrorService;
  constructor(protected _baseUrl: string, protected inject: Injector) {
    this.authService = this.inject.get(AuthService);
    this._http = this.inject.get(HttpClient);
    this.errorService = this.inject.get(ErrorService);
  }

  protected getAll(query?: string): Observable<T[]> {
    let url = query ? `${this._baseUrl}?${query}` : this._baseUrl;
    return this._http
      .get<T[]>(url, {
        headers: this.getHeaders(),
      })
      .pipe(
        catchError((err) => {
          this.errorService.handleError(err);
          return throwError(() => err);
        })
      );
  }

  protected getOne(id: number): Observable<T> {
    return this._http.get<T>(this._baseUrl + '/' + id, {
      headers: this.getHeaders(),
    });
  }

  protected update(id: number, data: T): Observable<T[]> {
    return this._http
      .put<T>(this._baseUrl + '/' + id, data, {
        headers: this.getHeaders(),
      })
      .pipe(concatMap(() => this.getAll()));
  }

  protected create(data: T): Observable<T[]> {
    return this._http
      .post<T[]>(this._baseUrl, data, {
        headers: this.getHeaders(),
      })
      .pipe(concatMap(() => this.getAll()));
  }

  protected delete(id: number): Observable<T[]> {
    return this._http
      .delete<void>(this._baseUrl + '/' + id, {
        headers: this.getHeaders(),
      })
      .pipe(concatMap(() => this.getAll()));
  }

  private getHeaders() {
    return {
      Authorization: 'Bearer ' + this.authService.getTokenvalue(),
    };
  }
}

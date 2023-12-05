import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  map,
  tap,
  concatMap,
  catchError,
  throwError,
  delay,
} from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ErrorService } from './error.service';
import { Store } from '@ngrx/store';
import { selectAuthInfo } from 'src/app/auth/store/auth.selectors';

export abstract class HttpService<T> {
  protected _http: HttpClient;
  protected authService: AuthService;
  protected errorService: ErrorService;
  protected store: Store;
  constructor(protected _baseUrl: string, protected inject: Injector) {
    this.authService = this.inject.get(AuthService);
    this._http = this.inject.get(HttpClient);
    this.errorService = this.inject.get(ErrorService);
    this.store = this.inject.get(Store);
  }

  protected getAll(query?: string): Observable<T[]> {
    let url = query ? `${this._baseUrl}?${query}` : this._baseUrl;
    return this.getHeaders().pipe(
      concatMap((headers) =>
        this._http
          .get<T[]>(url, {
            headers,
          })
          .pipe(
            catchError((err) => {
              this.errorService.handleError(err);
              return throwError(() => err);
            })
          )
      )
    );
  }

  protected getOne(id: number, query?: string): Observable<T> {
    let url = query
      ? `${this._baseUrl}/${id}?${query}`
      : `${this._baseUrl}/${id}`;
    return this.getHeaders().pipe(
      concatMap((headers) =>
        this._http.get<T>(url, {
          headers,
        })
      )
    );
  }

  protected getPopulated<K>(query: string): Observable<K[]> {
    return this.getHeaders().pipe(
      concatMap((headers) =>
        this._http.get<K[]>(`${this._baseUrl}?${query}`, {
          headers,
        })
      )
    );
  }

  protected update(id: number, data: Partial<T>): Observable<T[]> {
    return this.getHeaders().pipe(
      concatMap((headers) =>
        this._http
          .patch<T>(this._baseUrl + '/' + id, data, {
            headers,
          })
          .pipe(concatMap(() => this.getAll()))
      )
    );
  }

  protected create(data: T): Observable<T[]> {
    return this.getHeaders().pipe(
      concatMap((headers) =>
        this._http
          .post<T[]>(this._baseUrl, data, {
            headers,
          })
          .pipe(concatMap(() => this.getAll()))
      )
    );
  }

  protected delete(id: number): Observable<T[]> {
    return this.getHeaders().pipe(
      concatMap((headers) =>
        this._http
          .delete<Object>(this._baseUrl + '/' + id, {
            headers,
          })
          .pipe(concatMap(() => this.getAll()))
      )
    );
  }

  private getHeaders(): Observable<{ Authorization: string }> {
    return this.store.select(selectAuthInfo).pipe(
      map((info) => ({ Authorization: 'Bearer ' + info?.accessToken })),
      delay(800)
    );
  }
}

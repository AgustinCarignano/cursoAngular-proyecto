import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class HttpService<T> {
  constructor(protected _http: HttpClient, protected _baseUrl: string) {}

  abstract getAll(): Observable<T[]>;

  abstract getOne(id: number): Observable<T>;

  abstract update(id: number, data: T): Observable<T[]>;

  abstract create(data: T): Observable<T[]>;

  abstract delete(id: number): Observable<T[]>;
}

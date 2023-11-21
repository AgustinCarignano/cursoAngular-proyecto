import { Injectable, Injector } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class UserApiService extends HttpService<User> {
  constructor(injector: Injector) {
    super(environment.baseUrl + '/users', injector);
  }

  public getUsers() {
    return this.getAll();
  }

  public getUser(userId: number) {
    return this.getOne(userId);
  }

  public addUser(user: User) {
    return this.create(user);
  }

  public updateUser(user: User) {
    return this.update(user.id, user);
  }

  public deleteUser(userId: number) {
    return this.delete(userId);
  }
}

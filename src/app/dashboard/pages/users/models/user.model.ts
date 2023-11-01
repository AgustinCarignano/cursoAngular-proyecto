import { UserRole } from '../enums/user-role.enum';
import { IAPIUser } from './user-api.model';

export interface IUser {
  id: number;
  userName: string;
  email: string;
  password: string;
  role: UserRole;
}

export class User implements IUser {
  id: number;
  userName: string;
  email: string;
  password: string;
  role: UserRole;

  constructor(data: IAPIUser) {
    this.id = data.id;
    this.userName = data.userName;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
  }
}

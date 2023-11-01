import { UserRole } from '../enums/user-role.enum';
import { IUser } from './user.model';

export interface IAPIUser {
  id: number;
  userName: string;
  email: string;
  password: string;
  role: UserRole;
}

export class APIUser implements IAPIUser {
  id: number;
  userName: string;
  email: string;
  password: string;
  role: UserRole;

  constructor(data: IUser) {
    this.id = data.id;
    this.userName = data.userName;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
  }
}

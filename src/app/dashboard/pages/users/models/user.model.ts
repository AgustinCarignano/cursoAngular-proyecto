import { UserRole } from '../enums/user-role.enum';
import { IAPIUser } from './user-api.model';

export interface PublicUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface IUser extends PublicUser {
  password: string;
}

export class User implements IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;

  constructor(data: IAPIUser) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
  }
}

import { UserRole } from '../enums/user-role.enum';
import { IUser } from './user.model';

export interface IAPIUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export class APIUser implements IAPIUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;

  constructor(data: IUser) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
  }
}

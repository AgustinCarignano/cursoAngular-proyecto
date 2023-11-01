import { UserRol } from 'src/app/dashboard/pages/users/enums/user-role.enum';
import { APIUser } from 'src/app/dashboard/pages/users/models/user-api.model';

export const usersData: APIUser[] = [
  {
    id: 1,
    userName: 'Agustin Carignano',
    email: 'acarignano@mail.com',
    password: '12345',
    rol: UserRol.ADMIN,
  },
  {
    id: 2,
    userName: 'John Doe',
    email: 'john_doe@mail.com',
    password: '12345',
    rol: UserRol.EMPLOYEE,
  },
];

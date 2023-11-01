import { APIStudent } from './student-api.model';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: Date;
  dni: string;
  email: string;
  phoneNumber: string;
  country: string;
  province: string;
  city: string;
}

export class Student implements Student {
  constructor(data: APIStudent) {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      birthdate: new Date(data.birthdate),
      dni: data.dni,
      email: data.email,
      phoneNumber: data.phoneNumber,
      country: data.country,
      province: data.province,
      city: data.city,
    };
  }
}

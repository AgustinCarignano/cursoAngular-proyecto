import { Person } from 'src/app/dashboard/commons/person/models/person.model';
import { APIStudent } from './student-api.model';
import { Enrollment } from '../../enrollments/models';

export interface IStudent extends Person {
  enrollments?: Enrollment[];
}

export class Student implements IStudent {
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
  enrollments?: Enrollment[];

  constructor(data: APIStudent) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.birthdate = new Date(data.birthdate);
    this.dni = data.dni;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.country = data.country;
    this.province = data.province;
    this.city = data.city;
    this.enrollments = data.enrollments;
  }
}

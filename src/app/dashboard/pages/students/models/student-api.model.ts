import { APIPerson } from 'src/app/dashboard/commons/person/models/person.model';
import { Student } from './student.model';

export interface IAPIStudent extends APIPerson {}

export class APIStudent implements IAPIStudent {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: string;
  dni: string;
  email: string;
  phoneNumber: string;
  country: string;
  province: string;
  city: string;

  constructor(data: Student) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.birthdate = data.birthdate.toISOString();
    this.dni = data.dni;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.country = data.country;
    this.province = data.province;
    this.city = data.city;
  }
}

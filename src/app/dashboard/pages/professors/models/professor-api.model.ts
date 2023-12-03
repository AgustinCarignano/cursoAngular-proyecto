import { APIPerson } from 'src/app/dashboard/commons/person/models/person.model';
import { Professor } from './professor.model';
import { APICourseEdition } from '../../courses/models';

export class APIProfessor implements APIPerson {
  birthdate: string;
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phoneNumber: string;
  country: string;
  province: string;
  city: string;
  editions?: APICourseEdition[];

  constructor(data: Professor) {
    this.birthdate = data.birthdate.toISOString();
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.dni = data.dni;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.country = data.country;
    this.province = data.province;
    this.city = data.city;
    this.editions = data.editions?.map((e) => new APICourseEdition(e));
  }
}

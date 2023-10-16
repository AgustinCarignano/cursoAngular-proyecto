import { APIAlumn } from './alumns-api.model';

export interface Alumn {
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

export class Alumn implements Alumn {
  constructor(data: APIAlumn) {
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

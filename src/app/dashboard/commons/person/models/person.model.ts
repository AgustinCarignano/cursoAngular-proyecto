export interface BasePerson {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phoneNumber: string;
  country: string;
  province: string;
  city: string;
}

export interface Person extends BasePerson {
  birthdate: Date;
}

export interface APIPerson extends BasePerson {
  birthdate: string;
}

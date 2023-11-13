import { Course } from './course.model';

export interface IAPICourse {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  imgUrl: string;
  available: boolean;
}

export class APICourse implements IAPICourse {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  imgUrl: string;
  available: boolean;

  constructor(data: Course) {
    this.id = data.id;
    this.title = data.title;
    this.shortDescription = data.shortDescription;
    this.description = data.description;
    this.imgUrl = data.imgUrl;
    this.available = data.available;
  }
}

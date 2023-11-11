import { APICourse } from './course-api.model';

export interface ICourse {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  imgUrl: string;
  available: boolean;
}

export class Course implements ICourse {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  imgUrl: string;
  available: boolean;

  constructor(course: APICourse) {
    this.id = course.id;
    this.title = course.title;
    this.description = course.description;
    this.shortDescription = course.shortDescription;
    this.imgUrl = course.imgUrl;
    this.available = course.available;
  }
}

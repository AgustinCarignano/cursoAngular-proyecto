import { APICourseEdition } from './course-api-edition.model';
import { APICourse } from './course-api.model';
import { CourseEdition } from './course-editions.model';

export interface ICourse {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  imgUrl: string;
  available: boolean;
  editions?: CourseEdition[];
}

export class Course implements ICourse {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  imgUrl: string;
  available: boolean;
  editions?: CourseEdition[];

  constructor(course: APICourse) {
    this.id = course.id;
    this.title = course.title;
    this.description = course.description;
    this.shortDescription = course.shortDescription;
    this.imgUrl = course.imgUrl;
    this.available = course.available;
    this.editions = course.editions?.map((e) => new CourseEdition(e));
  }
}

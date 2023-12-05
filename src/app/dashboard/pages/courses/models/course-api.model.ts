import { APICourseEdition } from './course-api-edition.model';
import { CourseEdition } from './course-editions.model';
import { Course } from './course.model';

export interface IAPICourse {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  imgUrl: string;
  available: boolean;
  editions?: APICourseEdition[];
}

export class APICourse implements IAPICourse {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  imgUrl: string;
  available: boolean;
  editions?: APICourseEdition[];

  constructor(data: Course) {
    this.id = data.id;
    this.title = data.title;
    this.shortDescription = data.shortDescription;
    this.description = data.description;
    this.imgUrl = data.imgUrl;
    this.available = data.available;
    this.editions = data.editions?.map((e) => new APICourseEdition(e));
  }
}

import { IAPICourseEdition } from './course-api-edition.model';

export interface ICourseEdition {
  id: number;
  courseId: number;
  professorId: number;
  startDate: Date;
  endDate: Date;
}

export class CourseEdition implements ICourseEdition {
  id: number;
  courseId: number;
  professorId: number;
  startDate: Date;
  endDate: Date;

  constructor(data: IAPICourseEdition) {
    this.id = data.id;
    this.courseId = data.courseId;
    this.professorId = data.professorId;
    this.startDate = new Date(data.startDate);
    this.endDate = new Date(data.endDate);
  }
}

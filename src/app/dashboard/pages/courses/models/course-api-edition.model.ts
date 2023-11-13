import { ICourseEdition } from './course-editions.model';

export interface IAPICourseEdition {
  id: number;
  courseId: number;
  professorId: number;
  startDate: string;
  endDate: string;
}

export class APICourseEdition implements IAPICourseEdition {
  id: number;
  courseId: number;
  professorId: number;
  startDate: string;
  endDate: string;

  constructor(data: ICourseEdition) {
    this.id = data.id;
    this.courseId = data.courseId;
    this.professorId = data.professorId;
    this.startDate = data.startDate.toISOString();
    this.endDate = data.endDate.toISOString();
  }
}

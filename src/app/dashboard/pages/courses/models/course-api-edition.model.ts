import { Enrollment } from '../../enrollments/models';
import { APIProfessor } from '../../professors/models';
import { APICourse } from './course-api.model';
import { ICourseEdition } from './course-editions.model';
import { Course } from './course.model';

export interface IAPICourseEdition {
  id: number;
  courseId: number;
  professorId: number;
  startDate: string;
  endDate: string;
  course?: APICourse;
  professor?: APIProfessor;
  enrollments?: Enrollment[];
}

export interface IAPICourseEditionPopulated extends IAPICourseEdition {
  course: APICourse;
}

export class APICourseEdition implements IAPICourseEdition {
  id: number;
  courseId: number;
  professorId: number;
  startDate: string;
  endDate: string;
  course?: APICourse;
  professor?: APIProfessor;
  enrollments?: Enrollment[];

  constructor(data: ICourseEdition) {
    this.id = data.id;
    this.courseId = data.courseId;
    this.professorId = data.professorId;
    this.startDate = data.startDate.toISOString();
    this.endDate = data.endDate.toISOString();
    this.course = data.course ? new APICourse(data.course) : undefined;
    this.professor = data.professor
      ? new APIProfessor(data.professor)
      : undefined;
    this.enrollments = data.enrollments;
  }
}

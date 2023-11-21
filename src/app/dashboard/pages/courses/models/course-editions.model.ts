import { Enrollment } from '../../enrollments/models';
import { Professor } from '../../professors/models';
import { IAPICourseEdition } from './course-api-edition.model';
import { Course } from './course.model';

export interface ICourseEdition {
  id: number;
  courseId: number;
  professorId: number;
  startDate: Date;
  endDate: Date;
  course?: Course;
  professor?: Professor;
  enrollments?: Enrollment[];
}

// export interface ICourseEditionPopulated extends ICourseEdition {
//   course: Course;
// }

export class CourseEdition implements ICourseEdition {
  id: number;
  courseId: number;
  professorId: number;
  startDate: Date;
  endDate: Date;
  course?: Course;
  professor?: Professor;
  enrollments?: Enrollment[];

  constructor(data: IAPICourseEdition) {
    this.id = data.id;
    this.courseId = data.courseId;
    this.professorId = data.professorId;
    this.startDate = new Date(data.startDate);
    this.endDate = new Date(data.endDate);
    this.course = data.course ? new Course(data.course) : undefined;
    this.professor = data.professor ? new Professor(data.professor) : undefined;
    this.enrollments = data.enrollments;
  }
}

// export class CourseEditionPopulated
//   extends CourseEdition
//   implements ICourseEditionPopulated
// {
//   course: Course;

//   constructor(data: IAPICourseEditionPopulated) {
//     super(data);
//     this.course = data.course;
//   }
// }

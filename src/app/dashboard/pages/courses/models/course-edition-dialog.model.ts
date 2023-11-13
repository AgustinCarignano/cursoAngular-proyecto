import { CourseEdition } from './course-editions.model';

export interface CourseEditionDialog {
  title: string;
  courseEdition?: Partial<CourseEdition>;
}

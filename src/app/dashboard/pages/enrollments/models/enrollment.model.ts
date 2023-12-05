import { CourseEdition } from '../../courses/models';
import { Student } from '../../students/models/student.model';

export interface Enrollment {
  id: number;
  studentId: number;
  editionId: number;
  student?: Student;
  edition?: CourseEdition;
}

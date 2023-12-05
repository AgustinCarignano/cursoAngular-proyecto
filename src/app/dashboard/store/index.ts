import { StoreModule } from '@ngrx/store';
import * as fromCourse from '../pages/courses/store';
import * as fromStudent from '../pages/students/store';
import * as fromProfessor from '../pages/professors/store';
import * as fromEnrollment from '../pages/enrollments/store';

export const StoreFeatures = [
  StoreModule.forFeature(fromCourse.courseFeatureKey, fromCourse.courseReducer),
  StoreModule.forFeature(fromStudent.studentFeatureKey, fromStudent.reducer),
  StoreModule.forFeature(
    fromProfessor.professorFeatureKey,
    fromProfessor.reducer
  ),
  StoreModule.forFeature(
    fromEnrollment.enrollmentFeatureKey,
    fromEnrollment.reducer
  ),
];
export const StoreEffects = [
  fromCourse.CourseEffects,
  fromStudent.StudentEffects,
  fromEnrollment.EnrollmentEffects,
  fromProfessor.ProfessorEffects,
];

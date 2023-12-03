import { Injectable } from '@angular/core';
import { Observable, combineLatest, forkJoin, map } from 'rxjs';
import { StudentApiService } from './student-api.service';
import { BasicEntityService } from 'src/app/core/models/BasicEntityService.model';
import { Student } from '../models/student.model';
import { EnrollmentService } from '../../enrollments/services/enrollment.service';

@Injectable({
  providedIn: 'root',
})
export class StudentsService implements BasicEntityService {
  constructor(
    private studentsApiService: StudentApiService,
    private enrollmentService: EnrollmentService
  ) {}

  public getQuantity(): Observable<number> {
    return this.studentsApiService.getStudents().pipe(map((s) => s.length));
  }

  public getCompleteStudentDetail(studentId: number): Observable<Student> {
    return combineLatest([
      this.studentsApiService.getOneStudent(studentId),
      this.enrollmentService.getcompleteEnrollmentInformation(),
    ]).pipe(
      map(([student, enrollments]) => {
        const filteredEnroll = enrollments.filter(
          (e) => e.studentId === student.id
        );
        return { ...student, enrollments: filteredEnroll };
      })
    );
  }
}

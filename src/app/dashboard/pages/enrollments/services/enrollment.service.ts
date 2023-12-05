import { Injectable } from '@angular/core';
import { EnrollmentApiService } from './enrollment-api.service';
import { Observable, combineLatest, concatMap, forkJoin, map, tap } from 'rxjs';
import { Enrollment } from '../models';
import { CourseApiService } from '../../courses/services/course-api.service';
import { EditionsApiService } from '../../courses/services/editions-api.service';
import { CourseEdition } from '../../courses/models';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  constructor(
    private enrollmentApiService: EnrollmentApiService,
    private editionsApiService: EditionsApiService
  ) {}

  getcompleteEnrollmentInformation(): Observable<Enrollment[]> {
    return combineLatest([
      this.enrollmentApiService.getPopulatedEnrollments(),
      this.editionsApiService.getPopulatedEditions(),
    ]).pipe(
      map(([enrollments, editions]) =>
        enrollments.map((enr) => {
          const editionPopulated = editions.find(
            (ed) => ed.id === enr.editionId
          );
          return { ...enr, edition: editionPopulated };
        })
      )
    );
  }

  getCompleteEditionEnrollments(): Observable<CourseEdition[]> {
    return combineLatest([
      this.editionsApiService.getPopulatedEditions(),
      this.enrollmentApiService.getEnrollmentsWithStudents(),
    ]).pipe(
      map(([editions, enrollmets]) =>
        editions.map((ed) => {
          const enroll = enrollmets.filter((enr) => enr.editionId === ed.id);
          return { ...ed, enrollments: enroll };
        })
      )
    );
  }
}

import { Injectable, Injector } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { Enrollment } from '../models';
import { environment } from 'src/environments/environment.local';
import { Observable, concatMap, forkJoin, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentApiService extends HttpService<Enrollment> {
  constructor(injector: Injector) {
    super(environment.baseUrl + '/enrollments', injector);
  }

  public getEnrollments(): Observable<Enrollment[]> {
    return this.getAll();
  }

  public getOneEnrollment(enrollmentId: number): Observable<Enrollment> {
    return this.getOne(enrollmentId);
  }

  public getPopulatedEnrollments(): Observable<Enrollment[]> {
    return this.getPopulated<Enrollment>('_expand=student&_expand=edition');
  }

  public getEnrollmentsWithStudents(): Observable<Enrollment[]> {
    return this.getPopulated<Enrollment>('_expand=student');
  }

  public addEnrollment(enrollment: Enrollment): Observable<Enrollment[]> {
    return this.create(enrollment);
  }

  public deleteEnrollment(enrollmentId: number) {
    return this.delete(enrollmentId);
  }

  public deleteEnrollmentByEditionId(editionId: number) {
    return this.getAll(`editionId=${editionId}`).pipe(
      concatMap((enrollments) =>
        forkJoin(enrollments.map((e) => this.deleteEnrollment(e.id)))
      )
    );
  }
}

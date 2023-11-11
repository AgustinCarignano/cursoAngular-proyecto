import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { APICourseEdition, CourseEdition } from '../models';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class EditionsApiService extends HttpService<APICourseEdition> {
  constructor(injector: Injector) {
    super(environment.baseUrl + '/editions', injector);
  }

  getEditionsByCourseId(courseId: number): Observable<CourseEdition[]> {
    return this.getAll(`courseId=${courseId}`).pipe(map(this.adaptFromApi));
  }

  createCourseEdition(data: CourseEdition): Observable<CourseEdition[]> {
    return this.create(new APICourseEdition(data)).pipe(map(this.adaptFromApi));
  }

  editCourseEdition(data: CourseEdition): Observable<CourseEdition[]> {
    return this.update(data.id, new APICourseEdition(data)).pipe(
      map(this.adaptFromApi)
    );
  }

  deleteCourseEdition(courseId: number): Observable<CourseEdition[]> {
    return this.delete(courseId).pipe(map(this.adaptFromApi));
  }

  private adaptFromApi(data: APICourseEdition[]): CourseEdition[] {
    return data.map((c) => new CourseEdition(c));
  }
}

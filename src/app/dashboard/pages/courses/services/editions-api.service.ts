import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, concatMap } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import {
  APICourseEdition,
  CourseEdition,
  IAPICourseEdition,
  IAPICourseEditionPopulated,
} from '../models';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment.local';
import { CourseApiService } from './course-api.service';

@Injectable({
  providedIn: 'root',
})
export class EditionsApiService extends HttpService<APICourseEdition> {
  constructor(injector: Injector, private courseApiService: CourseApiService) {
    super(environment.baseUrl + '/editions', injector);
  }

  getEditionsByCourseId(courseId: number): Observable<CourseEdition[]> {
    return this.getAll(`courseId=${courseId}`).pipe(map(this.adaptFromApi));
  }

  public getPopulatedEditions(): Observable<CourseEdition[]> {
    return this.getPopulated<IAPICourseEdition>(
      `_expand=course&_expand=professor&_embed=enrollments`
    ).pipe(map(this.adaptPopulatedFromApi));
  }

  public getPopulatedEdition(editionId: number): Observable<CourseEdition> {
    return this.getOne(editionId).pipe(
      map((data) => new CourseEdition(data)),
      concatMap((edition) =>
        this.courseApiService
          .getOneCourse(edition.courseId)
          .pipe(map((course) => ({ ...edition, course })))
      )
    );
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

  private adaptPopulatedFromApi(data: IAPICourseEdition[]): CourseEdition[] {
    return data.map((e) => new CourseEdition(e));
  }
}

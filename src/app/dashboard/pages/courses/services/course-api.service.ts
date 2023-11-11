import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { APICourse, Course } from '../models';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class CourseApiService extends HttpService<APICourse> {
  constructor(injector: Injector) {
    super(environment.baseUrl + '/courses', injector);
  }

  getCourses(): Observable<Course[]> {
    return this.getAll().pipe(
      map((courses) => courses.map((c) => new Course(c)))
    );
  }

  getOneCourse(courseid: number): Observable<Course> {
    return this.getOne(courseid).pipe(map((course) => new Course(course)));
  }

  updateCourse(course: Course): Observable<Course[]> {
    return this.update(course.id, course).pipe(
      map((courses) => courses.map((c) => new Course(c)))
    );
  }

  createCourse(course: Course): Observable<Course[]> {
    return this.create(course).pipe(
      map((courses) => courses.map((c) => new Course(c)))
    );
  }

  deleteCourse(courseId: number): Observable<Course[]> {
    return this.delete(courseId).pipe(
      map((courses) => courses.map((c) => new Course(c)))
    );
  }
}

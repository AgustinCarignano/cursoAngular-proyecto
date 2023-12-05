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
    return this.getOne(courseid, '_embed=editions').pipe(
      map((course) => new Course(course))
    );
  }

  updateCourse(course: Course): Observable<Course[]> {
    const apiCourse = new APICourse(course);
    return this.update(course.id, apiCourse).pipe(
      map((courses) => courses.map((c) => new Course(c)))
    );
  }

  createCourse(course: Course): Observable<Course[]> {
    const apiCourse = new APICourse(course);
    return this.create(apiCourse).pipe(
      map((courses) => courses.map((c) => new Course(c)))
    );
  }

  deleteCourse(courseId: number): Observable<Course[]> {
    return this.delete(courseId).pipe(
      map((courses) => courses.map((c) => new Course(c)))
    );
  }
}

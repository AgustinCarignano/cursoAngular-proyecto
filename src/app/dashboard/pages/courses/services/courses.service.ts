import { Injectable } from '@angular/core';
import { APICourse } from '../models/course-api.model';
import { coursesData } from 'src/assets/mockData/coursesData';
import { Observable, map, of } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private data: APICourse[] = coursesData;

  constructor() {}

  public getCourses(): Observable<Course[]> {
    return of(this.data).pipe(map((data) => data.map((c) => new Course(c))));
  }

  public addCourse(course: Course): Observable<Course[]> {
    this.data = [...this.data, new APICourse({ ...course, id: this.getId() })];
    return this.getCourses();
  }

  public editCourse(course: Course): Observable<Course[]> {
    this.data = this.data.map((c) =>
      c.id === course.id ? new APICourse(course) : c
    );
    return this.getCourses();
  }

  public getCoursesQuantity(): Observable<number> {
    return this.getCourses().pipe(map((c) => c.length));
  }

  private getId(): number {
    return this.data[this.data.length - 1].id + 1;
  }
}

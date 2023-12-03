import { Injectable } from '@angular/core';
import { Observable, concatMap, map, tap } from 'rxjs';
import { CourseApiService } from './course-api.service';
import { BasicEntityService } from 'src/app/core/models/BasicEntityService.model';
import { EditionsApiService } from './editions-api.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService implements BasicEntityService {
  constructor(
    private courseApiService: CourseApiService,
    private editionApiService: EditionsApiService
  ) {}

  public getQuantity(): Observable<number> {
    return this.courseApiService.getCourses().pipe(map((c) => c.length));
  }

  public deleteCourse(courseId: number) {
    return this.courseApiService.deleteCourse(courseId).pipe(
      tap(() => {
        this.editionApiService.deleteEditionByCourseId(courseId);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CourseApiService } from './course-api.service';
import { BasicEntityService } from 'src/app/core/models/BasicEntityService.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService implements BasicEntityService {
  constructor(private courseApiService: CourseApiService) {}

  public getQuantity(): Observable<number> {
    return this.courseApiService.getCourses().pipe(map((c) => c.length));
  }
}

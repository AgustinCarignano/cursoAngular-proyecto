import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { StudentApiService } from './student-api.service';
import { BasicEntityService } from 'src/app/core/models/BasicEntityService.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService implements BasicEntityService {
  constructor(private studentsApiService: StudentApiService) {}

  public getQuantity(): Observable<number> {
    return this.studentsApiService.getStudents().pipe(map((s) => s.length));
  }
}

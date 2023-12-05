import { Injectable } from '@angular/core';
import { ProfessorsApiService } from './professors-api.service';
import { Observable, combineLatest, map } from 'rxjs';
import { BasicEntityService } from 'src/app/core/models/BasicEntityService.model';
import { Professor } from '../models';
import { EditionsApiService } from '../../courses/services/editions-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfessorsService implements BasicEntityService {
  constructor(
    private professorApiService: ProfessorsApiService,
    private editionsApiService: EditionsApiService
  ) {}

  public getQuantity(): Observable<number> {
    return this.professorApiService.getProfessors().pipe(map((p) => p.length));
  }

  public getCompleteProfessorDetail(profesorId: number): Observable<Professor> {
    return combineLatest([
      this.professorApiService.getOneProfessor(profesorId),
      this.editionsApiService.getPopulatedEditions(),
    ]).pipe(
      map(([profesor, editions]) => {
        const filteredEditions = editions.filter(
          (e) => e.professorId === profesorId
        );
        return { ...profesor, editions: filteredEditions };
      })
    );
  }
}

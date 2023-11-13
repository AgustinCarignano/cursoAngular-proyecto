import { Injectable } from '@angular/core';
import { ProfessorsApiService } from './professors-api.service';
import { Observable, map } from 'rxjs';
import { BasicEntityService } from 'src/app/core/models/BasicEntityService.model';

@Injectable({
  providedIn: 'root',
})
export class ProfessorsService implements BasicEntityService {
  constructor(private professorApiService: ProfessorsApiService) {}

  public getQuantity(): Observable<number> {
    return this.professorApiService.getProfessors().pipe(map((p) => p.length));
  }
}

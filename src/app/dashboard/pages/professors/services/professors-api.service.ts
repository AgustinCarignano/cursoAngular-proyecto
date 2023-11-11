import { Injectable, Injector } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { APIProfessor, Professor } from '../models';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class ProfessorsApiService extends HttpService<APIProfessor> {
  constructor(injector: Injector) {
    super(environment.baseUrl + '/professors', injector);
  }

  public getProfessors(): Observable<Professor[]> {
    return this.getAll().pipe(map(this.adaptFromApi));
  }

  public getOneProfessor(professorId: number): Observable<Professor> {
    return this.getOne(professorId).pipe(
      map(this.adaptFromApi),
      map((p) => p[0])
    );
  }

  public createProfessor(professor: Professor): Observable<Professor[]> {
    return this.create(new APIProfessor(professor)).pipe(
      map(this.adaptFromApi)
    );
  }

  public updateProfessor(professor: Professor): Observable<Professor[]> {
    return this.update(professor.id, new APIProfessor(professor)).pipe(
      map(this.adaptFromApi)
    );
  }

  public deleteProfessor(professorId: number): Observable<Professor[]> {
    return this.delete(professorId).pipe(map(this.adaptFromApi));
  }

  private adaptFromApi(data: APIProfessor | APIProfessor[]): Professor[] {
    if (data instanceof Array) {
      return data.map((p) => new Professor(p));
    } else {
      return [new Professor(data)];
    }
  }
}

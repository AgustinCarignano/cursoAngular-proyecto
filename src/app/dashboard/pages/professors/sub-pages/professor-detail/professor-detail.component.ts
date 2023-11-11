import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { ProfessorsApiService } from '../../services/professors-api.service';

@Component({
  selector: 'app-professor-detail',
  templateUrl: './professor-detail.component.html',
})
export class ProfessorDetailComponent {
  public professor$?: Observable<Professor>;
  public pagetitle = 'Professor details';

  constructor(
    private router: ActivatedRoute,
    private professorApiService: ProfessorsApiService
  ) {
    const id: string = this.router.snapshot.params['id'];
    if (id)
      this.professor$ = this.professorApiService.getOneProfessor(Number(id));
  }
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { ProfessorsApiService } from '../../services/professors-api.service';
import { ProfessorsService } from '../../services/professors.service';
import { BreadCrumb } from 'src/app/shared/models/breadcrumb.model';
import { Paths } from 'src/app/dashboard/enums/paths.enum';

@Component({
  selector: 'app-professor-detail',
  templateUrl: './professor-detail.component.html',
  styleUrls: ['./professor-detail.component.scss'],
})
export class ProfessorDetailComponent {
  public professor$?: Observable<Professor>;
  public pagetitle = 'Professor details';
  public breadcrumbs: BreadCrumb[] = [
    {
      label: 'Professors',
      path: [Paths.ROOT, Paths.DASHBOARD, Paths.PROFESORS],
    },
    { label: 'Details', path: '' },
  ];
  constructor(
    private router: ActivatedRoute,
    private professorApiService: ProfessorsApiService,
    private professorService: ProfessorsService
  ) {
    const id: string = this.router.snapshot.params['id'];
    if (id)
      this.professor$ = this.professorService.getCompleteProfessorDetail(
        Number(id)
      );
    // this.professor$ = this.professorApiService.getOneProfessor(Number(id));
  }
}

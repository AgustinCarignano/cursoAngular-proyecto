import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { BreadCrumb } from 'src/app/shared/models/breadcrumb.model';
import { Paths } from 'src/app/dashboard/enums/paths.enum';
import { Store } from '@ngrx/store';
import {
  ProfessorActions,
  selectIsLoadingProfessors,
  selectOneProfessor,
} from '../../store';

@Component({
  selector: 'app-professor-detail',
  templateUrl: './professor-detail.component.html',
  styleUrls: ['./professor-detail.component.scss'],
})
export class ProfessorDetailComponent {
  public professor$: Observable<Professor | null>;
  public isLoading$: Observable<boolean>;
  public pagetitle = 'Professor details';
  public breadcrumbs: BreadCrumb[] = [
    {
      label: 'Professors',
      path: [Paths.ROOT, Paths.DASHBOARD, Paths.PROFESORS],
    },
    { label: 'Details', path: '' },
  ];
  constructor(private router: ActivatedRoute, private store: Store) {
    const id: string = this.router.snapshot.params['id'];
    if (id)
      this.store.dispatch(
        ProfessorActions.loadProfessor({ professorId: Number(id) })
      );
    this.professor$ = this.store.select(selectOneProfessor);
    this.isLoading$ = this.store.select(selectIsLoadingProfessors);
  }
}

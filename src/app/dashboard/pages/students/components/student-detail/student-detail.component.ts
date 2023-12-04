import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Student } from '../../models/student.model';
import { Store } from '@ngrx/store';
import {
  StudentActions,
  selectIsLoadingStudents,
  selectOneStudent,
} from '../../store';
import { BreadCrumb } from 'src/app/shared/models/breadcrumb.model';
import { Paths } from 'src/app/dashboard/enums/paths.enum';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent {
  public student$?: Observable<Student | null>;
  public isLoading$: Observable<boolean>;
  public pageTitle = 'Student details';
  public breadcrumbs: BreadCrumb[] = [
    { label: 'Students', path: [Paths.ROOT, Paths.DASHBOARD, Paths.STUDENTS] },
    { label: 'Details', path: '' },
  ];

  constructor(private store: Store, private router: ActivatedRoute) {
    const id: string = this.router.snapshot.params['id'];
    if (id)
      this.store.dispatch(
        StudentActions.loadStudent({ studentId: Number(id) })
      );
    this.student$ = this.store.select(selectOneStudent);
    this.isLoading$ = this.store.select(selectIsLoadingStudents);
  }
}

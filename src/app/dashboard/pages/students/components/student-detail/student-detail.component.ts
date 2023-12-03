import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';
import { StudentApiService } from '../../services/student-api.service';
import { StudentsService } from '../../services/student.service';
import { Store } from '@ngrx/store';
import { StudentActions, selectOneStudent, selectStudents } from '../../store';
import { BreadCrumb } from 'src/app/shared/models/breadcrumb.model';
import { Paths } from 'src/app/dashboard/enums/paths.enum';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent {
  public student$?: Observable<Student | null>;
  public pageTitle = 'Student details';
  public breadcrumbs: BreadCrumb[] = [
    { label: 'Students', path: [Paths.ROOT, Paths.DASHBOARD, Paths.STUDENTS] },
    { label: 'Details', path: '' },
  ];

  constructor(
    private store: Store,
    // private studentService: StudentsService,
    private router: ActivatedRoute
  ) {
    const id: string = this.router.snapshot.params['id'];
    // if (id) this.student$ = this.studentApiService.getOneStudent(Number(id));
    // if (id)
    //   this.student$ = this.studentService.getCompleteStudentDetail(Number(id));
    if (id)
      this.store.dispatch(
        StudentActions.loadStudent({ studentId: Number(id) })
      );
    this.student$ = this.store.select(selectOneStudent);
  }
}

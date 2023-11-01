import { Component } from '@angular/core';
import { StudentsService } from '../../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent {
  public student$!: Observable<Student>;

  constructor(
    private studentService: StudentsService,
    private router: ActivatedRoute
  ) {
    const id: string = this.router.snapshot.params['id'];
    if (id) this.student$ = this.studentService.getAlumById(Number(id));
  }
}

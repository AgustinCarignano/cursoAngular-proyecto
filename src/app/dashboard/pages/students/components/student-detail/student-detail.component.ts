import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';
import { StudentApiService } from '../../services/student-api.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent {
  public student$?: Observable<Student>;
  public pageTitle = 'Student details';

  constructor(
    private studentApiService: StudentApiService,
    private router: ActivatedRoute
  ) {
    const id: string = this.router.snapshot.params['id'];
    if (id) this.student$ = this.studentApiService.getOneStudent(Number(id));
  }
}

import { Component } from '@angular/core';
import { Student } from './models/student.model';
// import { StudentsService } from './services/student.service';
import { Observable } from 'rxjs';
import { StudentsDialogService } from './services/student-dialog.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ActionsMessages } from '../../../core/enums/messages';
import { StudentApiService } from './services/student-api.service';
import { PersonDialogService } from '../../commons/person/services/person-dialog.service';
import { StudentForm } from './models/student-form.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  public students$: Observable<Student[]>;
  public buttonLabel = 'new student';
  public pageTitle = 'Student List';

  constructor(
    private studentsApiService: StudentApiService,
    private dialogService: PersonDialogService,
    private notificationService: NotificationService
  ) {
    this.students$ = this.studentsApiService.getStudents();
  }

  public newStudent(): void {
    this.dialogService
      .openFormDialog('New student', new StudentForm().form)
      .subscribe({
        next: (data) => {
          if (data) {
            this.students$ = this.studentsApiService.createStudent(data);
            this.notificationService.showNotification(
              ActionsMessages.addedStudent
            );
          }
        },
      });
  }

  public editStudent(student: Student): void {
    this.dialogService
      .openFormDialog('Edit student', new StudentForm(student).form, student)
      .subscribe({
        next: (data) => {
          if (data) {
            this.students$ = this.studentsApiService.updateStudent(data);
            this.notificationService.showNotification(
              ActionsMessages.editedStudent
            );
          }
        },
      });
  }

  public deleteStudent(studentId: number): void {
    this.dialogService.openConfirmDialog().subscribe({
      next: (resp) => {
        if (resp) {
          this.students$ = this.studentsApiService.deleteStudent(studentId);
          this.notificationService.showNotification(
            ActionsMessages.deletedStudent
          );
        }
      },
    });
  }
}

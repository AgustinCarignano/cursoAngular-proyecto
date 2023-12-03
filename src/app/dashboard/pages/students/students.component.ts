import { Component } from '@angular/core';
import { Student } from './models/student.model';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ActionsMessages } from '../../../core/enums/messages';
import { StudentApiService } from './services/student-api.service';
import { PersonDialogService } from '../../commons/person/services/person-dialog.service';
import { StudentForm } from './models/student-form.model';
import { Store } from '@ngrx/store';
import { StudentActions, selectStudents } from './store';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  public students$: Observable<Student[] | null>;
  public buttonLabel = 'new student';
  public pageTitle = 'Student List';

  constructor(
    private dialogService: PersonDialogService,
    private notificationService: NotificationService,
    private store: Store
  ) {
    this.store.dispatch(StudentActions.loadStudents());
    this.students$ = this.store.select(selectStudents);
  }

  public newStudent(): void {
    this.dialogService
      .openFormDialog('New student', new StudentForm().form)
      .subscribe({
        next: (student) => {
          if (student) {
            this.store.dispatch(StudentActions.createStudent({ student }));
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
        next: (student) => {
          if (student) {
            this.store.dispatch(StudentActions.updateStudent({ student }));
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
          this.store.dispatch(StudentActions.deleteStudent({ studentId }));
          this.notificationService.showNotification(
            ActionsMessages.deletedStudent
          );
        }
      },
    });
  }
}

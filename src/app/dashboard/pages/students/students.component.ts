import { Component } from '@angular/core';
import { Student } from './models/student.model';
import { StudentsService } from './services/student.service';
import { Observable } from 'rxjs';
import { StudentsDialogService } from './services/student-dialog.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ActionsMessages } from '../../../core/enums/messages';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  public students$: Observable<Student[]>;

  constructor(
    private studentsService: StudentsService,
    private dialogService: StudentsDialogService,
    private notificationService: NotificationService
  ) {
    this.students$ = this.studentsService.getStudents();
  }

  public newStudent(): void {
    this.dialogService.openFormDialog('New student').subscribe({
      next: (data) => {
        if (data) {
          this.students$ = this.studentsService.addStudent(data);
          this.notificationService.showNotification(
            ActionsMessages.addedStudent
          );
        }
      },
    });
  }

  public editStudent(student: Student): void {
    this.dialogService.openFormDialog('Edit student', student).subscribe({
      next: (data) => {
        if (data) {
          this.students$ = this.studentsService.editStudent(data);
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
          this.students$ = this.studentsService.deleteStudent(studentId);
          this.notificationService.showNotification(
            ActionsMessages.deletedStudent
          );
        }
      },
    });
  }
}

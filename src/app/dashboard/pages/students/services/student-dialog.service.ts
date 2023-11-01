import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsFormComponent } from '../components/student-form/student-form.component';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs';
import { ConfirmSnackbarComponent } from 'src/app/shared/components/confirm-snackbar/confirm-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class StudentsDialogService {
  constructor(private dialog: MatDialog) {}

  public openFormDialog(
    title: string,
    student?: Student
  ): Observable<Student | undefined> {
    return this.dialog
      .open(StudentsFormComponent, {
        data: {
          title,
          student,
        },
      })
      .afterClosed();
  }

  public openConfirmDialog(): Observable<boolean> {
    return this.dialog.open(ConfirmSnackbarComponent).afterClosed();
  }
}

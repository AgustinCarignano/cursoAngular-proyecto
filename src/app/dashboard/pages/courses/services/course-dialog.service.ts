import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmSnackbarComponent } from 'src/app/shared/components/confirm-snackbar/confirm-snackbar.component';
import { Course } from '../models';
import { CourseFormComponent } from '../components/course-form/course-form.component';

@Injectable({
  providedIn: 'root',
})
export class CourseDialogService {
  constructor(private dialog: MatDialog) {}

  public openFormDialog(
    title: string,
    course?: Course
  ): Observable<Course | undefined> {
    return this.dialog
      .open(CourseFormComponent, {
        data: {
          title,
          course,
        },
      })
      .afterClosed();
  }

  public openConfirmDialog(): Observable<boolean> {
    return this.dialog.open(ConfirmSnackbarComponent).afterClosed();
  }
}

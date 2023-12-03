import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, of } from 'rxjs';
import { ConfirmSnackbarComponent } from 'src/app/shared/components/confirm-snackbar/confirm-snackbar.component';
import { Course, CourseEdition } from '../models';
import { CourseFormComponent } from '../components/course-form/course-form.component';
import { EditionFormComponent } from '../components/edition-form/edition-form.component';
import { EnrollmentFormComponent } from '../../enrollments/components/enrollment-form/enrollment-form.component';

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

  public openEditionFormDialog(
    title: string,
    courseId: number,
    courseEdition?: CourseEdition
  ): Observable<CourseEdition | undefined> {
    return this.dialog
      .open(EditionFormComponent, {
        data: {
          title,
          courseEdition,
        },
      })
      .afterClosed()
      .pipe(map((data) => (data ? { ...data, courseId } : undefined)));
  }

  public openEnrollFormDialog(editionId: number): Observable<any> {
    return this.dialog
      .open(EnrollmentFormComponent, {
        data: {
          title: 'New enrollment',
          editionId,
        },
      })
      .afterClosed();
  }

  public openConfirmDialog(): Observable<boolean> {
    return this.dialog.open(ConfirmSnackbarComponent).afterClosed();
  }
}

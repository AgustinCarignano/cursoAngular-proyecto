import { Component } from '@angular/core';
import { EnrollmentApiService } from './services/enrollment-api.service';
import { Observable } from 'rxjs';
import { AddEnrollmentData, Enrollment } from './models';
import { Student } from '../students/models/student.model';
import { CourseEdition } from '../courses/models';
import { StudentApiService } from '../students/services/student-api.service';
import { EditionsApiService } from '../courses/services/editions-api.service';
import { SearchEnrollment } from './models/search-enroll-form.model';
import { EnrollmentService } from './services/enrollment.service';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentFormComponent } from './components/enrollment-form/enrollment-form.component';
import { Router } from '@angular/router';
import { Paths } from '../../enums/paths.enum';
import { ConfirmSnackbarComponent } from 'src/app/shared/components/confirm-snackbar/confirm-snackbar.component';
import { ENROLL_TEXTS } from './constants/texts.const';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss'],
})
export class EnrollmentsComponent {
  public editionEnrollments$!: Observable<CourseEdition[]>;

  constructor(
    private enrollmentApiService: EnrollmentApiService,
    private enrollmentService: EnrollmentService,
    private matDialog: MatDialog,
    private router: Router
  ) {
    this.asignEnrollments();
  }

  onAddStudent(editionId: number): void {
    this.matDialog
      .open<EnrollmentFormComponent, AddEnrollmentData>(
        EnrollmentFormComponent,
        {
          data: {
            title: ENROLL_TEXTS.addStudentDialogTitle,
            editionId,
          },
        }
      )
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (data) {
            this.enrollmentApiService.addEnrollment(data).subscribe({
              next: () => this.asignEnrollments(),
            });
          }
        },
      });
  }

  public onAddEnrollment(): void {
    this.matDialog
      .open<EnrollmentFormComponent, AddEnrollmentData>(
        EnrollmentFormComponent,
        {
          data: {
            title: ENROLL_TEXTS.addNewEnrollmentDialogTitle,
          },
        }
      )
      .afterClosed()
      .subscribe({
        next: (enrollment) => {
          if (enrollment) {
            this.enrollmentApiService.addEnrollment(enrollment).subscribe({
              next: () => this.asignEnrollments(),
            });
          }
        },
      });
  }

  public onDeleteEnrollment(enrollment: Enrollment): void {
    this.matDialog
      .open(ConfirmSnackbarComponent)
      .afterClosed()
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.enrollmentApiService
              .deleteEnrollment(enrollment.id)
              .subscribe({
                next: () => this.asignEnrollments(),
              });
          }
        },
      });
  }

  public onEditEdition(editionId: number): void {
    this.router.navigate([
      '',
      Paths.DASHBOARD,
      Paths.COURSES,
      Paths.DETAILS,
      editionId,
    ]);
  }

  public getFilterData(data: CourseEdition[]): CourseEdition[] {
    return data.filter((d) => d.enrollments && d.enrollments.length > 0);
  }

  private asignEnrollments(): void {
    this.editionEnrollments$ =
      this.enrollmentService.getCompleteEditionEnrollments();
  }
}

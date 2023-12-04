import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Course, CourseEdition } from '../../models';
import { EditionsApiService } from '../../services/editions-api.service';
import { CourseDialogService } from '../../services/course-dialog.service';
import { Professor } from '../../../professors/models';
import { ProfessorsApiService } from '../../../professors/services/professors-api.service';
import { Store } from '@ngrx/store';
import {
  CourseActions,
  selectCourse,
  selectIsLoadingCourses,
} from '../../store';
import { EnrollmentActions } from '../../../enrollments/store';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ActionsMessages } from 'src/app/core/enums/messages';
import { BreadCrumb } from 'src/app/shared/models/breadcrumb.model';
import { Paths } from 'src/app/dashboard/enums/paths.enum';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  public course$: Observable<Course | null>;
  public editions$!: Observable<CourseEdition[]>;
  public professors$: Observable<Professor[]>;
  public isLoading$: Observable<boolean>;
  public editionId: number;
  tableColumns: string[] = [
    'id',
    'startDate',
    'endDate',
    'professor',
    'actions',
  ];
  public breadcrumbs: BreadCrumb[] = [
    { label: 'Courses', path: [Paths.ROOT, Paths.DASHBOARD, Paths.COURSES] },
    { label: 'Details', path: '' },
  ];

  constructor(
    private router: ActivatedRoute,
    private store: Store,
    private notificationService: NotificationService,
    private editionApiService: EditionsApiService,
    private profesorApiService: ProfessorsApiService,
    private courseDialogService: CourseDialogService
  ) {
    this.editionId = Number(this.router.snapshot.params['id']);
    this.store.dispatch(CourseActions.loadCourse({ courseId: this.editionId }));
    this.course$ = this.store
      .select(selectCourse)
      .pipe(takeUntil(this.destroy$));
    this.asignEditions();
    this.professors$ = this.profesorApiService.getProfessors();
    this.isLoading$ = this.store.select(selectIsLoadingCourses);
  }

  public newEdition(courseId: number): void {
    this.courseDialogService
      .openEditionFormDialog('New course edition', courseId)
      .subscribe({
        next: (edition) => {
          if (edition) {
            this.editionApiService
              .createCourseEdition(edition)
              .pipe(takeUntil(this.destroy$))
              .subscribe();
            this.asignEditions();
          }
        },
      });
  }

  public editEdition(course: CourseEdition): void {
    this.courseDialogService
      .openEditionFormDialog('Edit course edition', course.courseId, course)
      .subscribe({
        next: (edition) => {
          if (edition) {
            this.editionApiService
              .editCourseEdition({ ...edition, id: course.id })
              .pipe(takeUntil(this.destroy$))
              .subscribe();
            this.asignEditions();
          }
        },
      });
  }

  public deleteEdition(editionId: number): void {
    this.courseDialogService.openConfirmDialog().subscribe({
      next: (resp) => {
        if (resp) {
          this.editionApiService
            .deleteCourseEdition(editionId)
            .pipe(takeUntil(this.destroy$))
            .subscribe();
          this.asignEditions();
        }
      },
    });
  }

  public enrollStudent(editionId: number): void {
    this.courseDialogService.openEnrollFormDialog(editionId).subscribe({
      next: (enrollment) => {
        if (enrollment) {
          this.store.dispatch(
            EnrollmentActions.createEnrollment({ enrollment })
          );
          this.notificationService.showNotification(
            ActionsMessages.addedEnrollment
          );
        }
      },
    });
  }

  public getEditionProfessor(
    professorId: number,
    professors: Professor[]
  ): Professor {
    return professors.filter((p) => p.id === professorId)[0] || '';
  }

  private asignEditions(): void {
    this.editions$ = this.editionApiService.getEditionsByCourseId(
      this.editionId
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

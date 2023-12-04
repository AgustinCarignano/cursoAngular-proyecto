import { Component, OnDestroy } from '@angular/core';
import {
  Observable,
  Subject,
  distinctUntilChanged,
  takeUntil,
  tap,
} from 'rxjs';
import { Course } from './models';
import { CourseDialogService } from './services/course-dialog.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ActionsMessages } from 'src/app/core/enums/messages';
import { Store } from '@ngrx/store';
import { CourseActions, selectCourses, selectIsLoadingCourses } from './store';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnDestroy {
  public courses$: Observable<Course[] | null>;
  public isLoading$: Observable<boolean>;
  private readonly destroy$: Subject<void> = new Subject();

  constructor(
    private store: Store,
    private dialogService: CourseDialogService,
    private notificationService: NotificationService
  ) {
    this.courses$ = this.store.select(selectCourses).pipe(
      distinctUntilChanged(),
      tap((courses) => {
        if (!courses) this.store.dispatch(CourseActions.loadCourses());
      })
    );
    this.isLoading$ = this.store.select(selectIsLoadingCourses);
  }

  public newCourse(): void {
    this.dialogService
      .openFormDialog('New Course')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (course) => {
          if (course) {
            this.store.dispatch(CourseActions.createCourse({ course }));
            this.notificationService.showNotification(
              ActionsMessages.addedCourse
            );
          }
        },
      });
  }

  public editCourse(course: Course): void {
    this.dialogService.openFormDialog('Edit course', course).subscribe({
      next: (course) => {
        if (course) {
          this.store.dispatch(CourseActions.updateCourse({ course }));
          this.notificationService.showNotification(
            ActionsMessages.editedCourse
          );
        }
      },
    });
  }

  public deleteCourse(courseId: number): void {
    this.dialogService.openConfirmDialog().subscribe({
      next: (resp) => {
        if (resp) {
          this.store.dispatch(CourseActions.deleteCourse({ courseId }));
          this.notificationService.showNotification(
            ActionsMessages.deletedCourse
          );
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

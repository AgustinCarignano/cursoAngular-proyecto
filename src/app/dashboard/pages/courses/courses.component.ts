import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Course } from './models';
import { CourseDialogService } from './services/course-dialog.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ActionsMessages } from 'src/app/core/enums/messages';
import { CourseApiService } from './services/course-api.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnDestroy {
  public courses$: Observable<Course[]>;
  private readonly destroy$: Subject<void> = new Subject();

  constructor(
    private courseApiService: CourseApiService,
    private dialogService: CourseDialogService,
    private notificationService: NotificationService
  ) {
    this.courses$ = this.courseApiService.getCourses();
  }

  public newCourse(): void {
    this.dialogService
      .openFormDialog('New Course')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data) {
            this.courses$ = this.courseApiService.createCourse(data);
            this.notificationService.showNotification(
              ActionsMessages.addedCourse
            );
          }
        },
      });
  }

  public editCourse(course: Course): void {
    this.dialogService
      .openFormDialog('Edit course', course)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data) {
            this.courses$ = this.courseApiService.updateCourse(data);
            this.notificationService.showNotification(
              ActionsMessages.editedCourse
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

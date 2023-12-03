import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';
import { Store } from '@ngrx/store';
import {
  selectAuthInfo,
  selectAuthUser,
} from 'src/app/auth/store/auth.selectors';
import { take } from 'rxjs';
import { UserRole } from '../../../users/enums/user-role.enum';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  @Input()
  public course!: Course;
  @Output()
  public editCourse: EventEmitter<Course> = new EventEmitter();
  @Output()
  public deleteCourse: EventEmitter<number> = new EventEmitter();
  public disabledDelete = true;

  constructor(private store: Store) {
    this.store
      .select(selectAuthUser)
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          if (user && user.role === UserRole.ADMIN) {
            this.disabledDelete = false;
          }
        },
      });
  }

  public onEditCourse(): void {
    this.editCourse.emit(this.course);
  }

  public onDeleteCourse(courseId: number): void {
    this.deleteCourse.emit(courseId);
  }
}

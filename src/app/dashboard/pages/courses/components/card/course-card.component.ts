import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  @Input()
  public course!: Course;
  @Output()
  editCourse: EventEmitter<Course> = new EventEmitter();

  public onEditCourse(): void {
    this.editCourse.emit(this.course);
  }
}

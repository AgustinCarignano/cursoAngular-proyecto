import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Course, CourseEdition } from '../../models';
import { CourseApiService } from '../../services/course-api.service';
import { EditionsApiService } from '../../services/editions-api.service';
import { CourseDialogService } from '../../services/course-dialog.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent {
  public course$: Observable<Course>;
  public editions$: Observable<CourseEdition[]>;
  tableColumns: string[] = ['id', 'startDate', 'endDate', 'actions'];

  constructor(
    private router: ActivatedRoute,
    private courseApiService: CourseApiService,
    private editionApiService: EditionsApiService,
    private courseDialogService: CourseDialogService
  ) {
    const id: string = this.router.snapshot.params['id'];
    this.course$ = this.courseApiService.getOneCourse(Number(id));
    this.editions$ = this.editionApiService.getEditionsByCourseId(Number(id));
  }

  newEdition(courseId: number): void {
    this.courseDialogService
      .openEditionFormDialog('New course edition', courseId)
      .subscribe({
        next: (data) => {
          if (data) {
            this.editions$ = this.editionApiService.createCourseEdition(data);
          }
        },
      });
  }

  editEdition(course: CourseEdition): void {
    this.courseDialogService
      .openEditionFormDialog('Edit course edition', course.id, course)
      .subscribe({
        next: (data) => {
          if (data) {
            this.editions$ = this.editionApiService.editCourseEdition(data);
          }
        },
      });
  }

  deleteEdition(courseId: number): void {
    this.courseDialogService.openConfirmDialog().subscribe({
      next: (resp) => {
        if (resp) {
          this.editions$ = this.editionApiService.deleteCourseEdition(courseId);
        }
      },
    });
  }
}

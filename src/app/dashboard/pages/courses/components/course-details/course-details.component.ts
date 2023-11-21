import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, forkJoin, map, tap } from 'rxjs';
import { Course, CourseEdition } from '../../models';
import { CourseApiService } from '../../services/course-api.service';
import { EditionsApiService } from '../../services/editions-api.service';
import { CourseDialogService } from '../../services/course-dialog.service';
import { Professor } from '../../../professors/models';
import { ProfessorsApiService } from '../../../professors/services/professors-api.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent {
  public course$: Observable<Course>;
  public editions$: Observable<CourseEdition[]>;
  public professors$: Observable<Professor[]>;
  tableColumns: string[] = [
    'id',
    'startDate',
    'endDate',
    'professor',
    'actions',
  ];

  constructor(
    private router: ActivatedRoute,
    private courseApiService: CourseApiService,
    private editionApiService: EditionsApiService,
    private profesorApiService: ProfessorsApiService,
    private courseDialogService: CourseDialogService
  ) {
    const id: string = this.router.snapshot.params['id'];
    this.course$ = this.courseApiService.getOneCourse(Number(id));
    this.editions$ = this.editionApiService.getEditionsByCourseId(Number(id));
    this.professors$ = this.profesorApiService.getProfessors();
  }

  public newEdition(courseId: number): void {
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

  public editEdition(course: CourseEdition): void {
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

  public deleteEdition(courseId: number): void {
    this.courseDialogService.openConfirmDialog().subscribe({
      next: (resp) => {
        if (resp) {
          this.editions$ = this.editionApiService.deleteCourseEdition(courseId);
        }
      },
    });
  }

  public enrollStudent(editionId: number): void {
    this.courseDialogService.openEnrollFormDialog(editionId);
  }

  public getEditionProfessor(
    professorId: number,
    professors: Professor[]
  ): Professor {
    return professors.filter((p) => p.id === professorId)[0] || '';
  }
}

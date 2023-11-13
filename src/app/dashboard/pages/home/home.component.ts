import { Component } from '@angular/core';
import { HomeCardData } from './models/home-card.model';
import { Observable, map } from 'rxjs';
import { CoursesService } from '../courses/services/courses.service';
import { HomeCardText } from './enums/home-card.enum';
import { Paths } from '../../enums/paths.enum';
import { StudentsService } from '../students/services/student.service';
import { ProfessorsService } from '../professors/services/professors.service';
import { BasicEntityService } from 'src/app/core/models/BasicEntityService.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public coursesData$: Observable<HomeCardData> = this.getData(
    this.courseService,
    HomeCardText.COURSE_TITLE,
    Paths.COURSES
  );
  public studentsData$: Observable<HomeCardData> = this.getData(
    this.studentService,
    HomeCardText.STUDENT_TITLE,
    Paths.STUDENTS
  );
  public professorsData$: Observable<HomeCardData> = this.getData(
    this.professorservice,
    HomeCardText.PROFESOR_TITLE,
    Paths.PROFESORS
  );

  constructor(
    private courseService: CoursesService,
    private studentService: StudentsService,
    private professorservice: ProfessorsService
  ) {}

  // public getCourseData(): Observable<HomeCardData> {
  //   return (this.coursesData$ = this.courseService.getCoursesQuantity().pipe(
  //     map((q) => ({
  //       title: HomeCardText.COURSE_TITLE,
  //       content: q,
  //       BbtnLink: ['', Paths.DASHBOARD, Paths.COURSES],
  //     }))
  //   ));
  // }

  // public getStudentData(): Observable<HomeCardData> {
  //   return this.studentService.getStudentsQuantity().pipe(
  //     map((q) => ({
  //       title: HomeCardText.STUDENT_TITLE,
  //       content: q,
  //       BbtnLink: ['', Paths.DASHBOARD, Paths.STUDENTS],
  //     }))
  //   );
  // }

  // public getProfessorData(): Observable<HomeCardData> {
  //   return this.professorservice.getProfessorsQuantity().pipe(
  //     map((q) => ({
  //       title: HomeCardText.PROFESOR_TITLE,
  //       content: q,
  //       BbtnLink: ['', Paths.DASHBOARD, Paths.PROFESORS],
  //     }))
  //   );
  // }

  private getData(
    service: BasicEntityService,
    title: HomeCardText,
    endPath: Paths
  ): Observable<HomeCardData> {
    return service.getQuantity().pipe(
      map((q) => ({
        title,
        content: q,
        BbtnLink: ['', Paths.DASHBOARD, endPath],
      }))
    );
  }
}

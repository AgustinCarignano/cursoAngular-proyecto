import { Component } from '@angular/core';
import { HomeCardData } from './models/home-card.model';
import { Observable, map } from 'rxjs';
import { CoursesService } from '../courses/services/courses.service';
import { HomeCardText } from './enums/home-card.enum';
import { Paths } from '../../enums/paths.enum';
import { StudentsService } from '../students/services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public coursesData$: Observable<HomeCardData> = this.getCourseData();
  public studentsData$: Observable<HomeCardData> = this.getStudentData();

  constructor(
    private courseService: CoursesService,
    private studentService: StudentsService
  ) {}

  public getCourseData(): Observable<HomeCardData> {
    return (this.coursesData$ = this.courseService.getCoursesQuantity().pipe(
      map((q) => ({
        title: HomeCardText.COURSE_TITLE,
        content: q,
        BbtnLink: ['', Paths.DASHBOARD, Paths.COURSES],
      }))
    ));
  }

  public getStudentData(): Observable<HomeCardData> {
    return this.studentService.getStudentsQuantity().pipe(
      map((q) => ({
        title: HomeCardText.STUDENT_TITLE,
        content: q,
        BbtnLink: ['', Paths.DASHBOARD, Paths.STUDENTS],
      }))
    );
  }
}

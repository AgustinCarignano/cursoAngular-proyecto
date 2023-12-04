import { Component } from '@angular/core';
import { HomeCardData } from './models/home-card.model';
import { Observable, map } from 'rxjs';
import { CoursesService } from '../courses/services/courses.service';
import { HomeCardText } from './enums/home-card.enum';
import { Paths } from '../../enums/paths.enum';
import { StudentsService } from '../students/services/student.service';
import { ProfessorsService } from '../professors/services/professors.service';
import { BasicEntityService } from 'src/app/core/models/BasicEntityService.model';
import { CalendarEvent } from 'angular-calendar';
import { EditionsApiService } from '../courses/services/editions-api.service';
import { addMonths, setMonth, setYear } from 'date-fns';
import { listOfMonths, listOfYears } from './constants/months.const';

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
  public viewDate = new Date();
  public events$!: Observable<CalendarEvent[]>;
  public monthsList = listOfMonths;
  public yearsList = listOfYears;

  constructor(
    private courseService: CoursesService,
    private studentService: StudentsService,
    private professorservice: ProfessorsService,
    private editionsService: EditionsApiService
  ) {
    this.makeEvents();
  }

  public changeMonth(direction: 'next' | 'back'): void {
    if (direction === 'next') {
      this.viewDate = addMonths(this.viewDate, 1);
    } else {
      this.viewDate = addMonths(this.viewDate, -1);
    }
  }

  public setNewMonth(month: number): void {
    this.viewDate = setMonth(this.viewDate, month);
  }

  public setNewYear(year: number): void {
    this.viewDate = setYear(this.viewDate, year);
  }

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

  private makeEvents(): void {
    this.events$ = this.editionsService.getPopulatedEditions().pipe(
      map((editions) =>
        editions.map((e) => {
          const event: CalendarEvent = {
            start: e.startDate,
            end: e.endDate,
            title:
              `${e.course?.title} - ${e.professor?.lastName}, ${e.professor?.firstName}` ||
              '',
            color: {
              primary: 'var(--bs-blue)',
              secondary: 'var(--bs-gray-200)',
            },
          };
          return event;
        })
      )
    );
  }
}

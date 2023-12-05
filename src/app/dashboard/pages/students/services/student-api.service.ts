import { Injectable, Injector } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { Student } from '../models/student.model';
import { environment } from 'src/environments/environment.local';
import { APIStudent } from '../models/student-api.model';

@Injectable({
  providedIn: 'root',
})
export class StudentApiService extends HttpService<APIStudent> {
  constructor(injector: Injector) {
    super(environment.baseUrl + '/students', injector);
  }

  getStudents(): Observable<Student[]> {
    return this.getAll().pipe(
      map((students) => students.map((s) => new Student(s)))
    );
  }

  getOneStudent(studentId: number): Observable<Student> {
    return this.getOne(studentId).pipe(map((student) => new Student(student)));
  }

  updateStudent(student: Student): Observable<Student[]> {
    return this.update(student.id, new APIStudent(student)).pipe(
      map((students) => students.map((s) => new Student(s)))
    );
  }

  createStudent(student: Student): Observable<Student[]> {
    return this.create(new APIStudent(student)).pipe(
      map((students) => students.map((s) => new Student(s)))
    );
  }

  deleteStudent(studentId: number): Observable<Student[]> {
    return this.delete(studentId).pipe(
      map((students) => students.map((s) => new Student(s)))
    );
  }
}

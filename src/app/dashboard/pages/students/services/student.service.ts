import { Injectable } from '@angular/core';
import { APIStudent } from '../models/student-api.model';
import { studentsData } from 'src/assets/mockData/studentsData';
import { Student } from '../models/student.model';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private data: APIStudent[] = studentsData;

  constructor() {}

  public getStudents(): Observable<Student[]> {
    return of(this.data).pipe(
      map((data) =>
        data.map((a) => ({ ...a, birthdate: new Date(a.birthdate) }))
      )
    );
  }

  public getAlumById(id: number): Observable<Student> {
    const student = this.data.find((a) => a.id === id);
    if (!student) throw new Error('404');
    return of(new Student(student));
  }

  public addStudent(student: Student): Observable<Student[]> {
    this.data = [
      ...this.data,
      {
        ...new APIStudent(student),
        id: this.getStudentId(),
      },
    ];
    return this.getStudents();
  }

  public editStudent(student: Student): Observable<Student[]> {
    this.data = this.data.map((a) =>
      a.id === student.id ? new APIStudent(student) : a
    );
    return this.getStudents();
  }

  public deleteStudent(studentId: number): Observable<Student[]> {
    this.data = this.data.filter((a) => a.id !== studentId);
    return this.getStudents();
  }

  public getStudentsQuantity(): Observable<number> {
    return this.getStudents().pipe(map((s) => s.length));
  }

  private getStudentId(): number {
    return this.data[this.data.length - 1].id + 1;
  }
}

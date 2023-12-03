import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../../students/models/student.model';
import { CourseEdition } from '../../../courses/models';
import { FormControl, FormGroup } from '@angular/forms';
import {
  SearchEnrollment,
  SearchEnrollmentControls,
  SearchEnrollmentForm,
} from '../../models/search-enroll-form.model';
import { Enrollment } from '../../models';

interface EnrollmentFilterOption {
  value: keyof Enrollment | '';
  viewValue: string;
}

interface EnrollmentSearch {
  filterBy: keyof Enrollment;
  value: number | Date;
}

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCardComponent {
  @Input() students!: Student[];
  @Input() editions!: CourseEdition[];
  @Output() search: EventEmitter<EnrollmentSearch> =
    new EventEmitter<EnrollmentSearch>();
  public form: FormGroup<SearchEnrollmentControls>;
  public filterByControl = new FormControl<EnrollmentFilterOption | null>(null);
  options: EnrollmentFilterOption[] = [
    { value: '', viewValue: '' },
    { value: 'studentId', viewValue: 'Student' },
    { value: 'editionId', viewValue: 'Course' },
  ];

  constructor() {
    this.form = new SearchEnrollmentForm().form;
  }

  public onSearch() {
    const filterBy = this.form.get('filterBy')?.value;
    if (!filterBy) {
      return this.form.markAllAsTouched();
    }
    console.log(this.form.get(filterBy)?.value);
  }

  public displayEditionFn(id?: number) {
    if (!id) return '';
    const edition = this.editions.find((e) => e.id === id);
    if (!edition) return id.toString();
    return `${
      edition.course?.title
    } - ${edition.startDate.toLocaleDateString()}`;
  }

  public displayStudentFn(id?: number) {
    if (!id) return '';
    const student = this.students.find((s) => s.id === id);
    if (!student) return id.toString();
    return `${student.lastName}, ${student.firstName}`;
  }

  public showInput(key: string) {
    return key === this.form.get('filterBy')?.value;
  }
}

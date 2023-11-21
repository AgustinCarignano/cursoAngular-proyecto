import { FormControl, FormGroup } from '@angular/forms';
import { Enrollment } from './enrollment.model';

export interface SearchEnrollment {
  filterBy: string;
  editionId: number | null;
  studentId: number | null;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

export interface SearchEnrollmentControls {
  filterBy: FormControl<string | null>;
  editionId: FormControl<number | null>;
  studentId: FormControl<number | null>;
  dateRange: FormGroup<DateRange>;
}

export interface DateRange {
  start: FormControl<Date | null>;
  end: FormControl<Date | null>;
}

export class SearchEnrollmentForm implements SearchEnrollmentControls {
  filterBy: FormControl<string | null> = new FormControl('');
  editionId: FormControl<number | null> = new FormControl(null);
  studentId: FormControl<number | null> = new FormControl(null);
  dateRange: FormGroup<DateRange> = this.makeDateRange();
  form: FormGroup<SearchEnrollmentControls>;

  constructor(data?: Enrollment) {
    this.form = new FormGroup({
      filterBy: this.filterBy,
      editionId: this.editionId,
      studentId: this.studentId,
      dateRange: this.dateRange,
    });
    if (data) {
      this.form.patchValue(data);
    }
  }

  private makeDateRange(): FormGroup<DateRange> {
    return new FormGroup<DateRange>({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
  }
}

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseEdition } from './course-editions.model';

export interface CourseEditionFormControls {
  professorId: FormControl<number | null>;
  startDate: FormControl<Date | null>;
  endDate: FormControl<Date | null>;
}

export class CourseEditionForm {
  professorId = new FormControl<number | null>(null, [Validators.required]);
  startDate = new FormControl<Date | null>(null, [Validators.required]);
  endDate = new FormControl<Date | null>(null, [Validators.required]);
  public form: FormGroup<CourseEditionFormControls>;

  constructor(data?: Partial<CourseEdition>) {
    this.form = new FormGroup({
      professorId: this.professorId,
      startDate: this.startDate,
      endDate: this.endDate,
    });
    if (data) {
      this.form.patchValue(data);
    }
  }
}

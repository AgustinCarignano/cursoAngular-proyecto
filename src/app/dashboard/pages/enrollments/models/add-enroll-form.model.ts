import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Enrollment } from './enrollment.model';

export interface AddEnrollmentControls {
  editionId: FormControl<number | null>;
  studentId: FormControl<number | null>;
}

export class AddEnrollmentForm implements AddEnrollmentControls {
  editionId: FormControl<number | null> = new FormControl<number | null>(null, [
    Validators.required,
  ]);
  studentId: FormControl<number | null> = new FormControl<number | null>(null, [
    Validators.required,
  ]);
  form: FormGroup<AddEnrollmentControls>;

  constructor(data?: Partial<Enrollment>) {
    this.form = new FormGroup({
      editionId: this.editionId,
      studentId: this.studentId,
    });
    if (data) {
      this.form.patchValue(data);
    }
  }
}

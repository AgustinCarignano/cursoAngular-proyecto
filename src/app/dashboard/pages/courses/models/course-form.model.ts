import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from './course.model';

export interface CourseFormControls {
  title: FormControl<string | null>;
  shortDescription: FormControl<string | null>;
  description: FormControl<string | null>;
  imgUrl: FormControl<string | null>;
  available: FormControl<boolean | null>;
}

export class CourseForm {
  title = new FormControl('', [Validators.required]);
  shortDescription = new FormControl('', [
    Validators.required,
    Validators.maxLength(150),
  ]);
  description = new FormControl('', [Validators.required]);
  imgUrl = new FormControl('', [Validators.required]);
  available = new FormControl(true);
  public form: FormGroup<CourseFormControls>;

  constructor(data?: Course) {
    this.form = new FormGroup({
      title: this.title,
      shortDescription: this.shortDescription,
      description: this.description,
      imgUrl: this.imgUrl,
      available: this.available,
    });
    if (data) this.form.patchValue(data);
  }
}

import { Component, Inject } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CourseForm,
  CourseFormControls,
  CourseDialog,
  Course,
} from '../../models';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  public title: string = '';
  public form: FormGroup<CourseFormControls>;

  constructor(
    private dialogRef: MatDialogRef<CourseFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: CourseDialog
  ) {
    this.title = this.data.title;
    this.form = new CourseForm(this.data.course).form;
  }

  public closeDialog(data?: Partial<Course>): void {
    this.dialogRef.close(data);
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const newData = this.form.value as Partial<Course>;
    if (this.data.course) {
      this.closeDialog({ ...newData, id: this.data.course.id });
    } else {
      this.closeDialog(newData);
    }
  }

  public getControlError(control: string): ValidationErrors | null {
    return this.form.get(control)?.errors || null;
  }
}

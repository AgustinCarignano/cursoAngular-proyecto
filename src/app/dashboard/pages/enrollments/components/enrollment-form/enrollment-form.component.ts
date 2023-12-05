import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  AddEnrollmentControls,
  AddEnrollmentData,
  AddEnrollmentForm,
  Enrollment,
} from '../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../../students/models/student.model';
import { StudentApiService } from '../../../students/services/student-api.service';
import { CourseEdition } from '../../../courses/models';
import { EditionsApiService } from '../../../courses/services/editions-api.service';

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.scss'],
})
export class EnrollmentFormComponent {
  public form: FormGroup<AddEnrollmentControls>;
  public students$: Observable<Student[]>;
  public editions$!: Observable<CourseEdition[]>;
  public title = '';
  public showEditions = false;

  constructor(
    private studentApiService: StudentApiService,
    private editionsApiService: EditionsApiService,
    private matDialogRef: MatDialogRef<EnrollmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: AddEnrollmentData
  ) {
    this.form = new AddEnrollmentForm().form;
    this.initDialog();
    this.students$ = this.studentApiService.getStudents();
  }

  public initDialog(): void {
    this.title = this.data.title;
    if (this.data.editionId) {
      this.form.patchValue({ editionId: this.data.editionId });
    } else {
      this.editions$ = this.editionsApiService.getPopulatedEditions();
      this.showEditions = true;
    }
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.matDialogRef.close(this.form.getRawValue());
  }
}

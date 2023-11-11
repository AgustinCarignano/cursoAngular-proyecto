import { Component, Inject } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  CourseEditionForm,
  CourseEditionFormControls,
  CourseEditionDialog,
} from '../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Professor } from '../../../professors/models';
import { ProfessorsApiService } from '../../../professors/services/professors-api.service';

@Component({
  selector: 'app-edition-form',
  templateUrl: './edition-form.component.html',
  styleUrls: ['./edition-form.component.scss'],
})
export class EditionFormComponent {
  public title: string = '';
  public form: FormGroup<CourseEditionFormControls>;
  public professors$: Observable<Professor[]>;

  constructor(
    private dialogRef: MatDialogRef<EditionFormComponent>,
    private professorsApiService: ProfessorsApiService,
    @Inject(MAT_DIALOG_DATA) private data: CourseEditionDialog
  ) {
    this.form = new CourseEditionForm(this.data.courseEdition).form;
    this.title = this.data.title;
    this.professors$ = this.professorsApiService.getProfessors();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    this.dialogRef.close(this.form.getRawValue());
  }

  public getControlError(control: string): ValidationErrors | null {
    return this.form.get(control)?.errors || null;
  }
}

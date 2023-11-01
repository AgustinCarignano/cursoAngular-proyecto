import { Component, Inject } from '@angular/core';
import { StudentForm } from '../../models/student-form.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentDialog } from '../../models/student-data.model';
import { Student } from '../../models/student.model';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-students-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentsFormComponent {
  public title: string = '';
  public form = new StudentForm().form;
  constructor(
    private dialogRef: MatDialogRef<StudentsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: StudentDialog
  ) {
    this.title = this.data.title;
    if (this.data.student) {
      this.form.patchValue(this.data.student);
    }
  }

  public closeDialog(data?: Partial<Student>): void {
    this.dialogRef.close(data);
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const newData = this.form.value as Partial<Student>;
    if (this.data.student) {
      this.closeDialog({ ...newData, id: this.data.student.id });
    } else {
      this.closeDialog(newData);
    }
  }

  public getControlError(control: string): ValidationErrors | null {
    return this.form.get(control)?.errors || null;
  }
}

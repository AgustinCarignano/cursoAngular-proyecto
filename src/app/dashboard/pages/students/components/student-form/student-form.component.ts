import { Component, Inject } from '@angular/core';
import { StudentForm } from '../../models/student-form.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentDialog } from '../../models/student-data.model';
import { Student } from '../../models/student.model';

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

  public onSubmit(newData: Partial<Student>): void {
    if (this.data.student) {
      this.closeDialog({ ...newData, id: this.data.student.id });
    } else {
      this.closeDialog(newData);
    }
  }
}

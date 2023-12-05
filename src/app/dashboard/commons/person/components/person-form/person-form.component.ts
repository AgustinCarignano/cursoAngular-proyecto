import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Person } from '../../models/person.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonDialog } from '../../models/person-data.model';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
})
export class PersonFormComponent {
  @Input() form!: FormGroup;
  @Input() title!: string;
  @Output() onCancel: EventEmitter<void> = new EventEmitter();
  @Output() onSubmit: EventEmitter<Partial<Person>> = new EventEmitter();

  constructor(
    private dialogRef: MatDialogRef<PersonFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: PersonDialog
  ) {
    this.title = data.title;
    this.form = data.form;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const newData = this.form.value as Partial<Person>;
    if (this.data.person) {
      this.dialogRef.close({ ...newData, id: this.data.person.id });
    } else {
      this.dialogRef.close(newData);
    }
  }
}

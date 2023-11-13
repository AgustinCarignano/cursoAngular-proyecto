import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Person } from '../models/person.model';
import { PersonFormComponent } from '../components/person-form/person-form.component';
import { ConfirmSnackbarComponent } from 'src/app/shared/components/confirm-snackbar/confirm-snackbar.component';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PersonDialogService {
  constructor(private dialog: MatDialog) {}

  public openFormDialog(
    title: string,
    form: FormGroup,
    person?: Person
  ): Observable<Person | undefined> {
    return this.dialog
      .open(PersonFormComponent, {
        data: {
          title,
          form,
          person,
        },
      })
      .afterClosed();
  }

  public openConfirmDialog(): Observable<boolean> {
    return this.dialog.open(ConfirmSnackbarComponent).afterClosed();
  }
}

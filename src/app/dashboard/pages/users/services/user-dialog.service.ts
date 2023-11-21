import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogData } from '../models/user-form-data.model';
import { User } from '../models/user.model';
import { UserFormComponent } from '../components/user-form/user-form.component';

@Injectable({
  providedIn: 'root',
})
export class UserDialogService {
  constructor(private matDialog: MatDialog) {}

  public openUserForm(data: UserDialogData): Observable<User | undefined> {
    return this.matDialog
      .open<UserFormComponent, UserDialogData>(UserFormComponent, {
        data,
      })
      .afterClosed();
  }
}

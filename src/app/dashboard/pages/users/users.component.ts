import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { UserApiService } from './services/user-api.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDialogData } from './models/user-form-data.model';
import { ConfirmSnackbarComponent } from 'src/app/shared/components/confirm-snackbar/confirm-snackbar.component';
import { UserDialogService } from './services/user-dialog.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users$: Observable<User[]>;

  constructor(
    private userApiService: UserApiService,
    private userDialogService: UserDialogService,
    private matDialog: MatDialog
  ) {
    this.users$ = this.userApiService.getUsers();
  }

  addUser(): void {
    this.userDialogService.openUserForm({ title: 'New user' }).subscribe({
      next: (data) => {
        if (data) {
          this.users$ = this.userApiService.addUser(data);
        }
      },
    });
  }

  public editUser(user: User): void {
    this.userDialogService
      .openUserForm({
        title: 'Edit user',
        user,
      })
      .subscribe({
        next: (data) => {
          if (data) {
            console.log(data);
            this.users$ = this.userApiService.updateUser(data);
          }
        },
      });
  }
  public deleteUser(userId: number): void {
    this.matDialog
      .open(ConfirmSnackbarComponent)
      .afterClosed()
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.users$ = this.userApiService.deleteUser(userId);
          }
        },
      });
  }
}

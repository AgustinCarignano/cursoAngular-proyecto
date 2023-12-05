import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicUser, User } from './models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmSnackbarComponent } from 'src/app/shared/components/confirm-snackbar/confirm-snackbar.component';
import { UserDialogService } from './services/user-dialog.service';
import { Store } from '@ngrx/store';
import { UserActions, selectUsers } from './store';
import { selectAuthUser } from 'src/app/auth/store/auth.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users$: Observable<User[] | null>;
  public loggedUser$: Observable<PublicUser | null>;

  constructor(
    private store: Store,
    private userDialogService: UserDialogService,
    private matDialog: MatDialog
  ) {
    this.store.dispatch(UserActions.loadUsers());
    this.users$ = this.store.select(selectUsers);
    this.loggedUser$ = this.store.select(selectAuthUser);
  }

  addUser(): void {
    this.userDialogService.openUserForm({ title: 'New user' }).subscribe({
      next: (data) => {
        if (data) {
          this.store.dispatch(UserActions.createUser({ user: data }));
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
            this.store.dispatch(UserActions.updateUser({ user: data }));
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
            this.store.dispatch(UserActions.deleteUser({ userId }));
          }
        },
      });
  }
}

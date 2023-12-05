import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserActions, selectIsLoadingUsers, selectOneUser } from '../../store';
import { UserDialogService } from '../../services/user-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmSnackbarComponent } from 'src/app/shared/components/confirm-snackbar/confirm-snackbar.component';
import { Paths } from 'src/app/dashboard/enums/paths.enum';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  public user$: Observable<User | null>;
  public isLoading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private userDialogService: UserDialogService,
    private matDialog: MatDialog
  ) {
    this.loadUser();
    this.user$ = this.store.select(selectOneUser);
    this.isLoading$ = this.store.select(selectIsLoadingUsers);
  }

  loadUser(): void {
    const id = this.route.snapshot.params['id'];
    this.store.dispatch(UserActions.loadUser({ userId: Number(id) }));
  }

  public editBasicInformation(user: User): void {
    this.userDialogService
      .openUserForm({
        title: 'Edit user',
        user,
      })
      .subscribe({
        next: (data) => {
          if (data) {
            this.store.dispatch(UserActions.updateUser({ user: data }));
            this.loadUser();
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
            this.router.navigate([Paths.ROOT, Paths.DASHBOARD, Paths.USERS]);
          }
        },
      });
  }

  public changePassword(user: User): void {
    this.userDialogService.openPasswordForm({ user }).subscribe({
      next: (data) => {
        if (data) {
          this.store.dispatch(UserActions.updateUser({ user: data }));
          this.loadUser();
        }
      },
    });
  }
}

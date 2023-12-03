import { Component, EventEmitter, Output, Input } from '@angular/core';
import { PublicUser, User } from '../../pages/users/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/auth/store/auth.selectors';
import { AuthActions } from 'src/app/auth/store';
import { Paths } from '../../enums/paths.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  public showSidebar = false;
  public user$: Observable<PublicUser | null>;
  @Output() public toggleSidebar: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {
    this.user$ = this.store.select(selectAuthUser);
  }

  public onClickMenu(): void {
    this.showSidebar = !this.showSidebar;
    this.toggleSidebar.emit(this.showSidebar);
  }

  public onLogout(): void {
    this.store.dispatch(AuthActions.cleanState());
    this.authService.logout();
  }

  public goToAccount(userId: number): void {
    this.router.navigate([
      Paths.ROOT,
      Paths.DASHBOARD,
      Paths.USERS,
      Paths.DETAILS,
      userId,
    ]);
  }
}

import { Component, EventEmitter, Output, Input } from '@angular/core';
import { User } from '../../pages/users/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  public showSidebar = false;
  public user: Observable<User>;
  @Output() public toggleSidebar: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(private authService: AuthService) {
    this.user = this.authService.getLoggedUser();
  }

  public onClickMenu(): void {
    this.showSidebar = !this.showSidebar;
    this.toggleSidebar.emit(this.showSidebar);
  }

  public onLogout(): void {
    this.authService.logout();
  }
}

import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(
    private authService: AuthService // private notificationService: NotificationService
  ) {}

  handleError(err: any): void {
    switch (err.status) {
      case 401:
        alert('The session has expired');
        this.authService.logout();
        // this.notificationService
        //   .showNotification('Session expired. Please, signin again')
        //   .subscribe({ next: () => this.authService.logout() });
        break;

      default:
        break;
    }
  }
}

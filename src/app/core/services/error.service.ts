import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private authService: AuthService) {}

  handleError(err: any): void {
    switch (err.status) {
      case 401:
        this.authService.logout();
        break;

      default:
        break;
    }
  }
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserApiService } from '../../services/user-api.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  public user$: Observable<User>;

  constructor(
    private router: ActivatedRoute,
    private userApiService: UserApiService
  ) {
    const id = this.router.snapshot.params['id'];
    this.user$ = this.userApiService.getUser(Number(id));
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';
import { UserRole } from '../../enums/user-role.enum';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/auth/store/auth.selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  @Input() dataSource!: User[];
  @Output() onEdit: EventEmitter<User> = new EventEmitter();
  @Output() onDelete: EventEmitter<number> = new EventEmitter();
  public displayedColumns = ['fullName', 'email', 'role'];

  constructor(private store: Store) {
    this.store
      .select(selectAuthUser)
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          if (user && user.role === UserRole.ADMIN) {
            this.displayedColumns.push('actions');
          }
        },
      });
  }

  public editUser(user: User): void {
    this.onEdit.emit(user);
  }
  public deleteUser(userId: number): void {
    this.onDelete.emit(userId);
  }

  public getVisibleRole(role: UserRole): string {
    switch (role) {
      case UserRole.ADMIN:
        return 'Administrator';
      case UserRole.EMPLOYEE:
        return 'Employee';
      default:
        return 'Employee';
    }
  }
}

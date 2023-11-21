import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDialogService } from './services/user-dialog.service';

@NgModule({
  declarations: [UsersComponent, UserTableComponent, UserFormComponent],
  imports: [CommonModule, SharedModule, UsersRoutingModule],
  providers: [UserDialogService],
})
export class UsersModule {}

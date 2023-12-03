import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDialogService } from './services/user-dialog.service';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';
import { UserPassFormComponent } from './components/user-pass-form/user-pass-form.component';

@NgModule({
  declarations: [UsersComponent, UserTableComponent, UserFormComponent, UserPassFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
  ],
  providers: [UserDialogService],
})
export class UsersModule {}

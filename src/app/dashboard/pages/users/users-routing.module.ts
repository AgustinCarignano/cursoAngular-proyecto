import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { Paths } from '../../enums/paths.enum';

const routes: Routes = [
  { path: '', component: UsersComponent },
  {
    path: `${Paths.DETAILS}/${Paths.ID}`,
    loadChildren: () =>
      import('./components/user-details/user-details.module').then(
        (m) => m.UserDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}

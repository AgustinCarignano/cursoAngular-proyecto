import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { Paths } from '../dashboard/enums/paths.enum';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: Paths.LOGIN,
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
      {
        path: Paths.REGISTER,
        loadChildren: () =>
          import('./register/register.module').then((m) => m.RegisterModule),
      },
      {
        path: '**',
        redirectTo: Paths.LOGIN,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

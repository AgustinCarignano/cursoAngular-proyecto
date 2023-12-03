import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Paths } from './dashboard/enums/paths.enum';
import { authGuard } from './core/guards/auth.guard';
import { hasSessionGuard } from './core/guards/has-session.guard';

const routes: Routes = [
  {
    path: Paths.DASHBOARD,
    canActivate: [authGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: Paths.AUTH,
    canActivate: [hasSessionGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: Paths.DASHBOARD,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

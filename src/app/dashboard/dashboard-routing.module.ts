import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { Paths } from './enums/paths.enum';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: Paths.HOME,
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: Paths.STUDENTS,
        loadChildren: () =>
          import('./pages/students/students.module').then(
            (m) => m.StudentsModule
          ),
      },
      {
        path: Paths.COURSES,
        loadChildren: () =>
          import('./pages/courses/courses.module').then((m) => m.CoursesModule),
      },
      {
        path: Paths.USERS,
        loadChildren: () =>
          import('./pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: Paths.ENROLLMENTS,
        loadChildren: () =>
          import('./pages/enrollments/enrollments.module').then(
            (m) => m.EnrollmentsModule
          ),
      },
      {
        path: Paths.PROFESORS,
        loadChildren: () =>
          import('./pages/professors/professors.module').then(
            (m) => m.ProfessorsModule
          ),
      },
      {
        path: '**',
        redirectTo: Paths.HOME,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

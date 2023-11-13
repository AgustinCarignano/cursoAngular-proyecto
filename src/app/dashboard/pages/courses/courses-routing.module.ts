import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { Paths } from '../../enums/paths.enum';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  {
    path: `${Paths.DETAILS}/${Paths.ID}`,
    loadChildren: () =>
      import('./components/course-details/course-details.module').then(
        (m) => m.CourseDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}

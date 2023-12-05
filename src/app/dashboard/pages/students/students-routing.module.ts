import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { Paths } from '../../enums/paths.enum';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  {
    path: `${Paths.DETAILS}/${Paths.ID}`,
    loadChildren: () =>
      import('./components/student-detail/student-detail.module').then(
        (m) => m.StudentDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}

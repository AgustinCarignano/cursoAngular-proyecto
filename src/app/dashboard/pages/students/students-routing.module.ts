import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { Paths } from '../../enums/paths.enum';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: `${Paths.DETAILS}/${Paths.ID}`, component: StudentDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}

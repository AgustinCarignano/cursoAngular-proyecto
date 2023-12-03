import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorsComponent } from './professors.component';
import { Paths } from '../../enums/paths.enum';

const routes: Routes = [
  { path: '', component: ProfessorsComponent },
  {
    path: `${Paths.DETAILS}/${Paths.ID}`,
    loadChildren: () =>
      import('./components/professor-detail/professor-detail.module').then(
        (m) => m.ProfessorDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessorsRoutingModule {}

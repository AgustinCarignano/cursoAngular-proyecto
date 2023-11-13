import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorDetailComponent } from './professor-detail.component';

const routes: Routes = [{ path: '', component: ProfessorDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessorDetailRoutingModule {}

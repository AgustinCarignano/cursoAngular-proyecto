import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorDetailRoutingModule } from './professor-detail-routing.module';
import { ProfessorDetailComponent } from './professor-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonModule } from 'src/app/dashboard/commons/person/person.module';

@NgModule({
  declarations: [ProfessorDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    PersonModule,
    ProfessorDetailRoutingModule,
  ],
})
export class ProfessorDetailModule {}

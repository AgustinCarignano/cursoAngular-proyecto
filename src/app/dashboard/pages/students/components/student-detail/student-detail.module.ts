import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentDetailRoutingModule } from './student-detail-routing.module';
import { StudentDetailComponent } from './student-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonModule } from 'src/app/dashboard/commons/person/person.module';

@NgModule({
  declarations: [StudentDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    PersonModule,
    StudentDetailRoutingModule,
  ],
})
export class StudentDetailModule {}

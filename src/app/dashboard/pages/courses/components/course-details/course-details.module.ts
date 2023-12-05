import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailsRoutingModule } from './course-details-routing.module';
import { CourseDetailsComponent } from './course-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [CourseDetailsComponent],
  imports: [
    CommonModule,
    CourseDetailsRoutingModule,
    SharedModule,
    MatCardModule,
  ],
})
export class CourseDetailsModule {}

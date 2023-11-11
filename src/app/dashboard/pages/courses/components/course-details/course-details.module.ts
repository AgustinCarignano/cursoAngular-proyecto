import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailsRoutingModule } from './course-details-routing.module';
import { CourseDetailsComponent } from './course-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CourseDialogService } from '../../services/course-dialog.service';

@NgModule({
  declarations: [CourseDetailsComponent],
  imports: [
    CommonModule,
    CourseDetailsRoutingModule,
    SharedModule,
    MatExpansionModule,
    MatCardModule,
    MatTableModule,
  ],
  // providers: [CourseDialogService],
})
export class CourseDetailsModule {}

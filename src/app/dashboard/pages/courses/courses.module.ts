import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseCardComponent } from './components/card/course-card.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CourseDialogService } from './services/course-dialog.service';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';

@NgModule({
  declarations: [CoursesComponent, CourseCardComponent, CourseFormComponent, CourseDetailComponent],
  imports: [CommonModule, SharedModule, CoursesRoutingModule, MatCardModule],
  providers: [CourseDialogService],
})
export class CoursesModule {}

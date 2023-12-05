import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseCardComponent } from './components/card/course-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CourseDialogService } from './services/course-dialog.service';
import { EditionFormComponent } from './components/edition-form/edition-form.component';
import { StoreModule } from '@ngrx/store';
import * as fromCourse from './store/reducers/course.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './store/effects/course.effects';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseCardComponent,
    CourseFormComponent,
    EditionFormComponent,
  ],
  imports: [CommonModule, SharedModule, CoursesRoutingModule],
  providers: [CourseDialogService],
})
export class CoursesModule {}

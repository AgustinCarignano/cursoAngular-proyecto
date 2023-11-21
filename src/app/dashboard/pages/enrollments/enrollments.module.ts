import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentsComponent } from './enrollments.component';
import { EnrollmentRoutingModule } from './enrollments-routing.module';
import { SearchCardComponent } from './components/search-card/search-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EnrollmentTableComponent } from './components/enrollment-table/enrollment-table.component';
import { EnrollmentFormComponent } from './components/enrollment-form/enrollment-form.component';

@NgModule({
  declarations: [EnrollmentsComponent, SearchCardComponent, EnrollmentTableComponent, EnrollmentFormComponent],
  imports: [CommonModule, EnrollmentRoutingModule, SharedModule],
})
export class EnrollmentsModule {}

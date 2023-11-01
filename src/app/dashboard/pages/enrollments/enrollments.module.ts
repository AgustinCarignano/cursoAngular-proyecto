import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentsComponent } from './enrollments.component';
import { EnrollmentRoutingModule } from './enrollments-routing.module';

@NgModule({
  declarations: [EnrollmentsComponent],
  imports: [CommonModule, EnrollmentRoutingModule],
})
export class EnrollmentsModule {}

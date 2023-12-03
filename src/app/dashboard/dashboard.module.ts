import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutModule } from './layout/layout.module';
import { EffectsModule } from '@ngrx/effects';
import * as fromStore from './store';
import { StoreModule } from '@ngrx/store';
import * as fromProfessor from './pages/professors/store/professor.reducer';
import { ProfessorEffects } from './pages/professors/store/professor.effects';
import * as fromEnrollment from './pages/enrollments/store/enrollment.reducer';
import { EnrollmentEffects } from './pages/enrollments/store/enrollment.effects';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule,
    ...fromStore.StoreFeatures,
    EffectsModule.forFeature(fromStore.StoreEffects),
  ],
})
export class DashboardModule {}

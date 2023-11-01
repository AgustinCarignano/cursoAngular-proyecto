import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsFormComponent } from './components/student-form/student-form.component';
import { StudentsTableComponent } from './components/student-table/student-table.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsDialogService } from './services/student-dialog.service';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { AgePipe } from './pipes/age.pipe';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsFormComponent,
    StudentsTableComponent,
    StudentDetailComponent,
    AgePipe,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatExpansionModule,
    SharedModule,
    StudentsRoutingModule,
  ],
  exports: [StudentsComponent],
  providers: [StudentsDialogService],
})
export class StudentsModule {}

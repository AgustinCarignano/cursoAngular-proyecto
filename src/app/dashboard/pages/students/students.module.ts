import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsFormComponent } from './components/student-form/student-form.component';
import { StudentsTableComponent } from './components/student-table/student-table.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsDialogService } from './services/student-dialog.service';
import { PersonModule } from '../../commons/person/person.module';
import { PersonDialogService } from '../../commons/person/services/person-dialog.service';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsFormComponent,
    StudentsTableComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    SharedModule,
    StudentsRoutingModule,
    PersonModule,
  ],
  exports: [StudentsComponent],
  providers: [StudentsDialogService, PersonDialogService],
})
export class StudentsModule {}

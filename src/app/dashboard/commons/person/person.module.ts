import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from './person.component';
import { PersonTableComponent } from './components/person-table/person-table.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';

@NgModule({
  declarations: [
    PersonComponent,
    PersonTableComponent,
    PersonFormComponent,
    PersonDetailComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    PersonComponent,
    PersonTableComponent,
    PersonFormComponent,
    PersonDetailComponent,
  ],
})
export class PersonModule {}

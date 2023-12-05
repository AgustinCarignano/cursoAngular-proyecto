import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnsComponent } from './alumns.component';
import { AlumnsFormComponent } from './components/alumns-form/alumns-form.component';
import { AlumnsTableComponent } from './components/alumns-table/alumns-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AlumnsComponent, AlumnsFormComponent, AlumnsTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule,
  ],
  exports: [AlumnsComponent],
})
export class AlumnsModule {}

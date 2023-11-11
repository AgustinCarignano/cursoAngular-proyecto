import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorsRoutingModule } from './professors-routing.module';
import { ProfessorsComponent } from './professors.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfessorsTableComponent } from './components/professors-table/professors-table.component';
import { PersonModule } from '../../commons/person/person.module';
import { ProfessorFormComponent } from './components/professor-form/professor-form.component';
import { PersonDialogService } from '../../commons/person/services/person-dialog.service';

@NgModule({
  declarations: [
    ProfessorsComponent,
    ProfessorsTableComponent,
    ProfessorFormComponent,
  ],
  imports: [CommonModule, ProfessorsRoutingModule, SharedModule, PersonModule],
  providers: [PersonDialogService],
})
export class ProfessorsModule {}

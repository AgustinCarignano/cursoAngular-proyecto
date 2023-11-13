import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from './models';
import { ProfessorsApiService } from './services/professors-api.service';
import { PersonDialogService } from '../../commons/person/services/person-dialog.service';
import { PersonForm } from '../../commons/person/models/person-form.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ActionsMessages } from 'src/app/core/enums/messages';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.scss'],
})
export class ProfessorsComponent {
  public pageTitle = 'Professors list';
  public buttonLabel = 'new professor';
  public professors$: Observable<Professor[]>;

  constructor(
    private professorsApiService: ProfessorsApiService,
    private dialogService: PersonDialogService,
    private notificationService: NotificationService
  ) {
    this.professors$ = this.professorsApiService.getProfessors();
  }

  public newProfessor(): void {
    this.dialogService
      .openFormDialog('New professor', new PersonForm().form)
      .subscribe({
        next: (data) => {
          if (data) {
            this.professors$ = this.professorsApiService.createProfessor(data);
            this.notificationService.showNotification(
              ActionsMessages.addedProfessor
            );
          }
        },
      });
  }

  public editProfessor(professor: Professor): void {
    console.log(professor);
    this.dialogService
      .openFormDialog(
        'New professor',
        new PersonForm(professor).form,
        professor
      )
      .subscribe({
        next: (data) => {
          if (data) {
            this.professors$ = this.professorsApiService.updateProfessor(data);
            this.notificationService.showNotification(
              ActionsMessages.editedProfessor
            );
          }
        },
      });
  }

  public deleteProfessor(professorId: number): void {
    this.dialogService.openConfirmDialog().subscribe({
      next: (resp) => {
        if (resp) {
          this.professors$ =
            this.professorsApiService.deleteProfessor(professorId);
          this.notificationService.showNotification(
            ActionsMessages.deletedProfessor
          );
        }
      },
    });
  }
}

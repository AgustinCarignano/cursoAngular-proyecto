import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Professor } from './models';
import { PersonDialogService } from '../../commons/person/services/person-dialog.service';
import { PersonForm } from '../../commons/person/models/person-form.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ActionsMessages } from 'src/app/core/enums/messages';
import { Store } from '@ngrx/store';
import {
  ProfessorActions,
  selectIsLoadingProfessors,
  selectProfessors,
} from './store';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.scss'],
})
export class ProfessorsComponent {
  public pageTitle = 'Professors list';
  public buttonLabel = 'new professor';
  public professors$: Observable<Professor[] | null>;
  public isLoading$: Observable<boolean>;

  constructor(
    private dialogService: PersonDialogService,
    private notificationService: NotificationService,
    private store: Store
  ) {
    this.professors$ = this.store.select(selectProfessors).pipe(
      tap((professors) => {
        if (!professors) this.store.dispatch(ProfessorActions.loadProfessors());
      })
    );
    this.isLoading$ = this.store.select(selectIsLoadingProfessors);
  }

  public newProfessor(): void {
    this.dialogService
      .openFormDialog('New professor', new PersonForm().form)
      .subscribe({
        next: (professor) => {
          if (professor) {
            this.store.dispatch(
              ProfessorActions.createProfessor({ professor })
            );
            this.notificationService.showNotification(
              ActionsMessages.addedProfessor
            );
          }
        },
      });
  }

  public editProfessor(professor: Professor): void {
    this.dialogService
      .openFormDialog(
        'New professor',
        new PersonForm(professor).form,
        professor
      )
      .subscribe({
        next: (professor) => {
          if (professor) {
            this.store.dispatch(
              ProfessorActions.updateProfessor({ professor })
            );
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
          this.store.dispatch(
            ProfessorActions.deleteProfessor({ professorId })
          );
          this.notificationService.showNotification(
            ActionsMessages.deletedProfessor
          );
        }
      },
    });
  }
}

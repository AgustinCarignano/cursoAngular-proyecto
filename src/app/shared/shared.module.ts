// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
// App imports
import { FullNamePipe } from './pipes/full-name.pipe';
import { TitleDirective } from './directives/title.directive';
import { FormErrorPipe } from './pipes/form-error.pipe';
import { ConfirmSnackbarComponent } from './components/confirm-snackbar/confirm-snackbar.component';
import { NotificationService } from './services/notification.service';

const matModules: any[] = [
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatSnackBarModule,
  MatListModule,
];
@NgModule({
  declarations: [
    FullNamePipe,
    TitleDirective,
    FormErrorPipe,
    ConfirmSnackbarComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ...matModules],
  exports: [
    ReactiveFormsModule,
    FullNamePipe,
    TitleDirective,
    FormErrorPipe,
    ...matModules,
  ],
  providers: [NotificationService],
})
export class SharedModule {}

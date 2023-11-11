// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
// App imports
import { FullNamePipe } from './pipes/full-name.pipe';
import { TitleDirective } from './directives/title.directive';
import { ShowErrorPipe } from './pipes/show-error.pipe';
import { ConfirmSnackbarComponent } from './components/confirm-snackbar/confirm-snackbar.component';
import { NotificationService } from './services/notification.service';
import { AgePipe } from './pipes/age.pipe';
import { GetErrorPipe } from './pipes/get-error.pipe';

const matModules: any[] = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
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
    ShowErrorPipe,
    AgePipe,
    ConfirmSnackbarComponent,
    GetErrorPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule, ...matModules],
  exports: [
    ReactiveFormsModule,
    FullNamePipe,
    TitleDirective,
    ShowErrorPipe,
    AgePipe,
    GetErrorPipe,
    ...matModules,
  ],
  providers: [NotificationService],
})
export class SharedModule {}

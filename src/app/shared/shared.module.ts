// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
// App imports
import { FullNamePipe } from './pipes/full-name.pipe';
import { TitleDirective } from './directives/title.directive';
import { ShowErrorPipe } from './pipes/show-error.pipe';
import { ConfirmSnackbarComponent } from './components/confirm-snackbar/confirm-snackbar.component';
import { NotificationService } from './services/notification.service';
import { AgePipe } from './pipes/age.pipe';
import { GetErrorPipe } from './pipes/get-error.pipe';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RelatedCoursesPipe } from './pipes/related-courses.pipe';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

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
  MatSelectModule,
  MatMenuModule,
  MatTableModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatChipsModule,
  MatDividerModule,
];
@NgModule({
  declarations: [
    FullNamePipe,
    TitleDirective,
    ShowErrorPipe,
    AgePipe,
    ConfirmSnackbarComponent,
    GetErrorPipe,
    EmptyStateComponent,
    SpinnerComponent,
    RelatedCoursesPipe,
    BreadcrumbComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ...matModules],
  exports: [
    ReactiveFormsModule,
    FullNamePipe,
    TitleDirective,
    ShowErrorPipe,
    AgePipe,
    GetErrorPipe,
    EmptyStateComponent,
    SpinnerComponent,
    RelatedCoursesPipe,
    BreadcrumbComponent,
    ...matModules,
  ],
  providers: [NotificationService],
})
export class SharedModule {}

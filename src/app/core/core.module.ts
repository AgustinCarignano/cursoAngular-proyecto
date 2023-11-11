import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../shared/services/notification.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatNativeDateModule, HttpClientModule],
  providers: [NotificationService],
})
export class CoreModule {}

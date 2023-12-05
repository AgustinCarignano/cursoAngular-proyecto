import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutComponent } from './layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ToolbarComponent, SidebarComponent, LayoutComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    SharedModule,
    MatToolbarModule,
    RouterModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}

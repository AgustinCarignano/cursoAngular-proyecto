import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutComponent } from './layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { AlumnsModule } from '../features/alumns/alumns.module';

@NgModule({
  declarations: [ToolbarComponent, SidebarComponent, LayoutComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    SharedModule,
    MatToolbarModule,
    AlumnsModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}

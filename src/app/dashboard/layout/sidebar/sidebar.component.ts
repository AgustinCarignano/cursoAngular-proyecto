import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnChanges {
  @Input()
  public opened = false;
  @ViewChild('drawer')
  drawer!: MatDrawer;
  public navigationLinks = this.layoutService.navigationLinks;

  constructor(private layoutService: LayoutService) {}

  ngOnChanges(): void {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }
}

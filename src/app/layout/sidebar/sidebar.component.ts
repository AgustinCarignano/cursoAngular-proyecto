import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnChanges {
  @Input() public opened = false;
  @ViewChild('drawer') drawer!: MatDrawer;
  public navigationLinks = [
    { label: 'Home', href: '#', icon: 'home', isActive: false },
    { label: 'Alumns', href: '#', icon: 'groups', isActive: true },
    { label: 'Courses', href: '#', icon: 'toc', isActive: false },
  ];
  ngOnChanges(): void {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }
}

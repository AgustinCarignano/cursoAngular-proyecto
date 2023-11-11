import { Injectable } from '@angular/core';
import { Paths } from '../enums/paths.enum';
import { NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public navigationLinks = [
    {
      label: Paths.HOME,
      href: ['', Paths.DASHBOARD, Paths.HOME],
      icon: 'home',
      isActive: true,
    },
    {
      label: Paths.USERS,
      href: ['', Paths.DASHBOARD, Paths.USERS],
      icon: 'person',
      isActive: false,
    },
    {
      label: Paths.STUDENTS,
      href: ['', Paths.DASHBOARD, Paths.STUDENTS],
      icon: 'groups',
      isActive: false,
    },
    {
      label: Paths.COURSES,
      href: ['', Paths.DASHBOARD, Paths.COURSES],
      icon: 'toc',
      isActive: false,
    },
    {
      label: Paths.ENROLLMENTS,
      href: ['', Paths.DASHBOARD, Paths.ENROLLMENTS],
      icon: 'view_agenda',
      isActive: false,
    },
    {
      label: Paths.PROFESORS,
      href: ['', Paths.DASHBOARD, Paths.PROFESORS],
      icon: 'supervised_user_circle',
      isActive: false,
    },
  ];

  constructor(private router: Router) {
    this.setActivePath();
  }

  public setActivePath(): void {
    this.router.events.subscribe({
      next: (e) => {
        if (e instanceof NavigationStart) {
          for (const key in this.navigationLinks) {
            if (this.navigationLinks[key].href.join('/').includes(e.url)) {
              this.navigationLinks[key].isActive = true;
            } else {
              this.navigationLinks[key].isActive = false;
            }
          }
          this.navigationLinks = [...this.navigationLinks];
        }
      },
    });
  }
}

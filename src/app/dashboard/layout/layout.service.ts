import { Injectable } from '@angular/core';
import { Paths } from '../enums/paths.enum';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public navigationLinks = [
    {
      label: Paths.HOME,
      href: ['', Paths.DASHBOARD, Paths.HOME],
      icon: 'home',
    },
    {
      label: Paths.USERS,
      href: ['', Paths.DASHBOARD, Paths.USERS],
      icon: 'person',
    },
    {
      label: Paths.STUDENTS,
      href: ['', Paths.DASHBOARD, Paths.STUDENTS],
      icon: 'groups',
    },
    {
      label: Paths.PROFESORS,
      href: ['', Paths.DASHBOARD, Paths.PROFESORS],
      icon: 'supervised_user_circle',
    },
    {
      label: Paths.COURSES,
      href: ['', Paths.DASHBOARD, Paths.COURSES],
      icon: 'toc',
    },
    {
      label: Paths.ENROLLMENTS,
      href: ['', Paths.DASHBOARD, Paths.ENROLLMENTS],
      icon: 'view_agenda',
    },
  ];
}

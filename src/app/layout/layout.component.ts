import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  public showSidebar = false;
  public onToggleSidebar(event: boolean): void {
    this.showSidebar = event;
  }
}

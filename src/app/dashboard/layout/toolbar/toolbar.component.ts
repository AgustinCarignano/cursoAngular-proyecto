import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  public showSidebar = false;
  @Output() public toggleSidebar: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  public onClickMenu(): void {
    this.showSidebar = !this.showSidebar;
    this.toggleSidebar.emit(this.showSidebar);
  }
}

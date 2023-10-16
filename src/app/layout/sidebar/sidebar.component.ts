import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnChanges {
  @Input() public opened = false;
  @ViewChild('drawer') drawer!: MatDrawer;
  ngOnChanges(): void {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }
}

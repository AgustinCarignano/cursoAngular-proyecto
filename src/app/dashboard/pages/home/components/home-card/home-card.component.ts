import { Component, Input } from '@angular/core';
import { HomeCardData } from '../../models/home-card.model';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent {
  @Input() public data!: HomeCardData;
  @Input() public isLoading!: boolean;
}

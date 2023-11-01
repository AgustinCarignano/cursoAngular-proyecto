import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [HomeComponent, HomeCardComponent],
  imports: [CommonModule, HomeRoutingModule, MatCardModule],
})
export class HomeModule {}

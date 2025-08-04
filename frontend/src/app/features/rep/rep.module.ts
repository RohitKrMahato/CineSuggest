import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RepDashboardComponent } from './rep-dashboard.component';

@NgModule({
  declarations: [RepDashboardComponent],
  imports: [CommonModule, FormsModule],
  exports: [RepDashboardComponent]
})
export class RepModule {}

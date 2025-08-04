import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TheatreListComponent } from './theatre-list.component';
import { ShowListComponent } from './show-list.component';

@NgModule({
  declarations: [TheatreListComponent, ShowListComponent],
  imports: [CommonModule, FormsModule],
  exports: [TheatreListComponent, ShowListComponent]
})
export class TheatreModule {}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ShowListComponent {
  @Input() shows: any[] = [];
  @Input() selectedTheatre: any;
  @Output() bookShow = new EventEmitter<any>();

  onBook(show: any) {
    this.bookShow.emit(show);
  }
}

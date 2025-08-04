import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent {
  @Input() shows: any[] = [];
  @Input() selectedTheatre: any;
  @Output() bookShow = new EventEmitter<any>();

  onBook(show: any) {
    this.bookShow.emit(show);
  }
}

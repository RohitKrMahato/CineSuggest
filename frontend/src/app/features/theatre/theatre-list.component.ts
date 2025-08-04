import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-theatre-list',
  templateUrl: './theatre-list.component.html',
  styleUrls: ['./theatre-list.component.scss']
})
export class TheatreListComponent {
  @Input() theatres: any[] = [];
  @Output() selectTheatre = new EventEmitter<any>();

  onSelect(theatre: any) {
    this.selectTheatre.emit(theatre);
  }
}

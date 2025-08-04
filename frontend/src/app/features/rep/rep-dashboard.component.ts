import { Component } from '@angular/core';
import { TheatreService } from '../../core/theatre.service';

@Component({
  selector: 'app-rep-dashboard',
  templateUrl: './rep-dashboard.component.html',
  styleUrls: ['./rep-dashboard.component.scss']
})
export class RepDashboardComponent {
  newShow = {
    theatreId: null,
    movieId: null,
    timing: '',
    price: null,
    seats: null
  };
  message = '';

  constructor(private theatreService: TheatreService) {}

  addShow() {
    this.theatreService.addShow(this.newShow).subscribe({
      next: res => {
        this.message = res.message || 'Show added successfully!';
      },
      error: err => {
        this.message = err.error?.message || 'Error adding show.';
      }
    });
  }
}

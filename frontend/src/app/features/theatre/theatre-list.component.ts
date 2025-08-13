import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TheatreService } from '../../core/theatre.service';

@Component({
  selector: 'app-theatre-list',
  templateUrl: './theatre-list.component.html',
  styleUrls: ['./theatre-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  providers: [TheatreService]
})
export class TheatreListComponent implements OnInit {
  theatres: any[] = [];
  selectedDate: string = '';
  selectedTheatre: any = null;
  shows: any[] = [];
  message: string = '';

  constructor(private theatreService: TheatreService) {}

  ngOnInit() {
    this.fetchTheatres();
  }

  fetchTheatres() {
    // Replace 'New York' with dynamic location if needed
    this.theatreService.getTheatres('New York').subscribe({
      next: res => {
        this.theatres = res;
      },
      error: err => {
        this.message = 'Error fetching theatres.';
      }
    });
  }

  onDateChange(date: string) {
    this.selectedDate = date;
    this.shows = [];
    this.selectedTheatre = null;
  }

  onSelectTheatre(theatre: any) {
    this.selectedTheatre = theatre;
    this.theatreService.getShows(theatre.id).subscribe({
      next: res => {
        this.shows = res.filter((show: any) => show.timing.startsWith(this.selectedDate));
      },
      error: err => {
        this.message = 'Error fetching shows.';
      }
    });
  }

  onBook(show: any) {
    // Implement booking logic or emit event
    this.message = `Booking for ${show.movie} at ${show.timing} in ${this.selectedTheatre.name}`;
  }
}

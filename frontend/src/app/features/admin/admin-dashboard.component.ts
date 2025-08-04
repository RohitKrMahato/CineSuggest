import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TheatreService } from '../../core/theatre.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [TheatreService]
})
export class AdminDashboardComponent {
  newTheatre = {
    name: '',
    location: '',
    representativeId: null
  };
  message = '';

  constructor(private theatreService: TheatreService) {}

  addTheatre() {
    this.theatreService.addTheatre(this.newTheatre).subscribe({
      next: res => {
        this.message = res.message || 'Theatre added successfully!';
      },
      error: err => {
        this.message = err.error?.message || 'Error adding theatre.';
      }
    });
  }
}

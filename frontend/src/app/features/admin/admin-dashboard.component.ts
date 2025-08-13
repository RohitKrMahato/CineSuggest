import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminDataService } from './admin-data.service';
import type { Theater, Movie, Show } from './admin.models';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AdminDashboardComponent {
  newTheatre = { name: '', location: '' };
  newMovie = { title: '', genre: '' };
  newShow = { theaterId: '', movieId: '', time: '' };
  message = '';
  activeTab: 'add' | 'list' = 'add';

  constructor(public data: AdminDataService) {}

  getTheaterName(id: number): string {
    const t = this.data.theaters.find(theater => theater.id === id);
    return t ? t.name : '';
  }
  getMovieTitle(id: number): string {
    const m = this.data.movies.find(movie => movie.id === id);
    return m ? m.title : '';
  }

  addTheatre() {
    if (this.newTheatre.name && this.newTheatre.location) {
      this.data.addTheater({ id: Date.now(), ...this.newTheatre });
      this.newTheatre = { name: '', location: '' };
    }
  }
  editTheatre(theater: Theater) {
    const name = prompt('Edit theater name', theater.name);
    const location = prompt('Edit location', theater.location);
    if (name && location) {
      this.data.editTheater({ ...theater, name, location });
    }
  }
  deleteTheatre(id: number) { this.data.deleteTheater(id); }

  addMovie() {
    if (this.newMovie.title && this.newMovie.genre) {
      this.data.addMovie({ id: Date.now(), ...this.newMovie });
      this.newMovie = { title: '', genre: '' };
    }
  }
  editMovie(movie: Movie) {
    const title = prompt('Edit movie title', movie.title);
    const genre = prompt('Edit genre', movie.genre);
    if (title && genre) {
      this.data.editMovie({ ...movie, title, genre });
    }
  }
  deleteMovie(id: number) { this.data.deleteMovie(id); }

  addShow() {
    if (this.newShow.theaterId && this.newShow.movieId && this.newShow.time) {
      this.data.addShow({
        id: Date.now(),
        theaterId: Number(this.newShow.theaterId),
        movieId: Number(this.newShow.movieId),
        time: this.newShow.time
      });
      this.newShow = { theaterId: '', movieId: '', time: '' };
    }
  }
  editShow(show: Show) {
    const theaterId = Number(prompt('Edit theater ID', show.theaterId.toString()));
    const movieId = Number(prompt('Edit movie ID', show.movieId.toString()));
    const time = prompt('Edit show time', show.time);
    if (theaterId && movieId && time) {
      this.data.editShow({ ...show, theaterId, movieId, time });
    }
  }
  deleteShow(id: number) { this.data.deleteShow(id); }
}

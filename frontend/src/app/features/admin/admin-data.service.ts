import { Injectable } from '@angular/core';
import { Theater, Movie, Show } from './admin.models';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  theaters: Theater[] = [
    { id: 1, name: 'Cineplex', location: 'Downtown' },
    { id: 2, name: 'MovieMax', location: 'Uptown' }
  ];
  movies: Movie[] = [
    { id: 1, title: 'Inception', genre: 'Sci-Fi' },
    { id: 2, title: 'Titanic', genre: 'Romance' }
  ];
  shows: Show[] = [
    { id: 1, theaterId: 1, movieId: 1, time: '18:00' },
    { id: 2, theaterId: 2, movieId: 2, time: '20:00' }
  ];

  addTheater(theater: Theater) { this.theaters.push(theater); }
  editTheater(theater: Theater) {
    const idx = this.theaters.findIndex(t => t.id === theater.id);
    if (idx > -1) this.theaters[idx] = theater;
  }
  deleteTheater(id: number) {
    this.theaters = this.theaters.filter(t => t.id !== id);
    this.shows = this.shows.filter(s => s.theaterId !== id);
  }

  addMovie(movie: Movie) { this.movies.push(movie); }
  editMovie(movie: Movie) {
    const idx = this.movies.findIndex(m => m.id === movie.id);
    if (idx > -1) this.movies[idx] = movie;
  }
  deleteMovie(id: number) {
    this.movies = this.movies.filter(m => m.id !== id);
    this.shows = this.shows.filter(s => s.movieId !== id);
  }

  addShow(show: Show) { this.shows.push(show); }
  editShow(show: Show) {
    const idx = this.shows.findIndex(s => s.id === show.id);
    if (idx > -1) this.shows[idx] = show;
  }
  deleteShow(id: number) {
    this.shows = this.shows.filter(s => s.id !== id);
  }
}

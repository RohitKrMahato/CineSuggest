import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';

interface Movie {
  id: number;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  poster: string;
  description: string;
  showtimes: string[];
}

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [
    {
      id: 1,
      title: 'Avengers: Endgame',
      genre: 'Action, Adventure, Drama',
      duration: '3h 1m',
      rating: 'PG-13',
      poster: '🦸‍♂️',
      description: 'The epic conclusion to the Infinity Saga.',
      showtimes: ['10:00 AM', '2:00 PM', '6:00 PM', '10:00 PM']
    },
    {
      id: 2,
      title: 'The Lion King',
      genre: 'Animation, Adventure, Drama',
      duration: '1h 58m',
      rating: 'PG',
      poster: '🦁',
      description: 'A photorealistic computer-animated remake of Disney\'s traditionally animated 1994 film.',
      showtimes: ['11:00 AM', '3:00 PM', '7:00 PM']
    },
    {
      id: 3,
      title: 'Joker',
      genre: 'Crime, Drama, Thriller',
      duration: '2h 2m',
      rating: 'R',
      poster: '🃏',
      description: 'A gritty character study of Arthur Fleck, a man disregarded by society.',
      showtimes: ['12:00 PM', '4:00 PM', '8:00 PM']
    },
    {
      id: 4,
      title: 'Spider-Man: No Way Home',
      genre: 'Action, Adventure, Sci-Fi',
      duration: '2h 28m',
      rating: 'PG-13',
      poster: '🕷️',
      description: 'Peter Parker\'s secret identity is revealed to the entire world.',
      showtimes: ['9:00 AM', '1:00 PM', '5:00 PM', '9:00 PM']
    },
    {
      id: 5,
      title: 'Dune',
      genre: 'Action, Adventure, Drama',
      duration: '2h 35m',
      rating: 'PG-13',
      poster: '🏜️',
      description: 'A noble family becomes embroiled in a war for control over the galaxy\'s most valuable asset.',
      showtimes: ['10:30 AM', '2:30 PM', '6:30 PM']
    },
    {
      id: 6,
      title: 'Black Widow',
      genre: 'Action, Adventure, Sci-Fi',
      duration: '2h 14m',
      rating: 'PG-13',
      poster: '🕸️',
      description: 'Natasha Romanoff confronts the darker parts of her ledger.',
      showtimes: ['11:30 AM', '3:30 PM', '7:30 PM']
    }
  ];

  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  bookMovie(movie: Movie, showtime: string) {
    if (!this.isAuthenticated) {
      alert('Please login to book tickets!');
      return;
    }
    
    alert(`Booking ${movie.title} for ${showtime}. This would redirect to booking page in a full implementation.`);
  }
} 
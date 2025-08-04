import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TheatreService {
  constructor(private http: HttpClient) {}

  getTheatres(location: string): Observable<any[]> {
    // Sample data for demo purposes
    const sampleTheatres = [
      { id: 1, name: 'NYC Grand Cinema', location: 'New York' },
      { id: 2, name: 'LA Movie Palace', location: 'Los Angeles' },
      { id: 3, name: 'Chicago Film Center', location: 'Chicago' }
    ];
    // Keep API call for future backend connection
    // return this.http.get<any[]>(`/api/theatres?location=${location}`);
    return of(sampleTheatres.filter(t => t.location === location));
  }

  getShows(theatreId: number): Observable<any[]> {
    // Sample data for demo purposes
    const sampleShows = [
      { id: 1, movie: 'Action Blast', timing: '2025-08-04T18:00', price: 12.5, seats: 50 },
      { id: 2, movie: 'Romantic Escape', timing: '2025-08-04T20:30', price: 10.0, seats: 40 },
      { id: 3, movie: 'Comedy Night', timing: '2025-08-04T19:00', price: 11.0, seats: 60 },
      { id: 4, movie: 'Thriller Zone', timing: '2025-08-04T21:00', price: 13.0, seats: 55 }
    ];
    // Keep API call for future backend connection
    // return this.http.get<any[]>(`/api/shows/${theatreId}`);
    return of(sampleShows);
  }

  addTheatre(data: any): Observable<any> {
    // return this.http.post('/api/admin/theatre', data);
    return of({ message: 'Theatre added (demo mode)' });
  }

  addShow(data: any): Observable<any> {
    // return this.http.post('/api/rep/show', data);
    return of({ message: 'Show added (demo mode)' });
  }
}

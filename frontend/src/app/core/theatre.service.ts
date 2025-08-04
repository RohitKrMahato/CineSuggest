import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TheatreService {
  constructor(private http: HttpClient) {}

  getTheatres(location: string): Observable<any> {
    return this.http.get(`/api/theatres?location=${location}`);
  }

  getShows(theatreId: number): Observable<any> {
    return this.http.get(`/api/shows/${theatreId}`);
  }

  addTheatre(data: any): Observable<any> {
    return this.http.post('/api/admin/theatre', data);
  }

  addShow(data: any): Observable<any> {
    return this.http.post('/api/rep/show', data);
  }
}

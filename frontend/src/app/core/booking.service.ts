import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) {}

  book(showId: number): Observable<any> {
    return this.http.post('/api/book', { show_id: showId });
  }
}

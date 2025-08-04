import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SuggestionService {
  constructor(private http: HttpClient) {}

  getSuggestions(): Observable<any> {
    return this.http.get('/api/suggest');
  }
}

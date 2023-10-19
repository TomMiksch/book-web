import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IsbnQuery} from './objects/IsbnQuery';

@Injectable({
  providedIn: 'root'
})
export class IsbnService {

  constructor(private http: HttpClient) { }

  getBook(isbn: string): Observable<IsbnQuery> {
    return this.http.get<IsbnQuery>(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
  }
}

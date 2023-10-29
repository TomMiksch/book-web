import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Book} from './objects/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Book[]> {
    console.log('what the hell');
    return this.http.get<Book[]>('https://192.168.1.35:8080/book/getAll');
  }

  saveBook(book: Book): Observable<Book> {
    return this.http.post<Book>('https://192.168.1.35:8080/book/save', book);
  }
}

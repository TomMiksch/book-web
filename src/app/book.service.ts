import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Book} from './objects/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:8080/book/getAll');
  }
}

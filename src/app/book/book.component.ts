import {Component, OnInit} from '@angular/core';
import {BookService} from '../book.service';
import {Book} from '../objects/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  books: Book[] = [];

  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'publisher'
  ]

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.bookService.getAll().subscribe({
      next: val => {
        this.books = val;
      },
      error: err => {
        console.error('=============>', err);
      }
    });
  }

}

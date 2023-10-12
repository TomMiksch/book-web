import {Component, OnInit} from '@angular/core';
import {BookService} from '../book.service';
import {Book} from '../objects/Book';
import {Router} from '@angular/router';

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
    'publisher',
    'stillHave',
    'location',
    'edit'
  ]

  constructor(private bookService: BookService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.router.getCurrentNavigation()
    this.bookService.getAll().subscribe({
      next: val => {
        this.books = val;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  toEditPage(id: number) {
    this.router.navigate(['/editBook'], {
      state: {
        editMode: true,
        bookId: id
      }
    }).then(r => console.log(r));
  }
}

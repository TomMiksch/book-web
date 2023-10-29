import {Component, OnInit} from '@angular/core';
import {BookService} from '../book.service';
import {Book} from '../objects/Book';
import {Router} from '@angular/router';
import {EditOrAddService} from '../edit-or-add.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  message: string = ''

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
              private editOrAddService: EditOrAddService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.router.getCurrentNavigation()
    this.bookService.getAll().subscribe({
      next: val => {
        this.books = val;
      },
      error: err => {
        this.message = err;
        console.error(err);
      }
    });
  }

  toEditPage(id: number) {
    this.editOrAddService.setEditMode(true);
    this.editOrAddService.setBookId(id);
    this.router.navigate(['/editBook']).then(r => console.log(r));
  }
}

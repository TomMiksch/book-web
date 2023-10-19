import {Component, OnInit} from '@angular/core';
import {EditOrAddService} from '../edit-or-add.service';
import {IsbnService} from '../isbn.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {

  header: string = 'Loading...'
  bookId: number = -1;
  isbn: string = '';
  editMode: boolean = false;
  title: string | undefined = '';
  author: string | undefined = '';
  publisher: string | undefined = '';

  constructor(private editOrAddService: EditOrAddService,
              private isbnService: IsbnService) {
  }

  ngOnInit(): void {
    this.editMode = this.editOrAddService.getEditMode();
    this.header = this.editMode ? 'Edit Book' : 'Add Book';
    if (this.editMode) {
      this.bookId = this.editOrAddService.getBookId();
      // TODO get the book here
    }
  }

  findBook() {
    this.isbnService.getBook(this.isbn).subscribe({
      next: (response) => {
        this.title = response.items[0]?.volumeInfo?.title;
        this.author = response.items[0]?.volumeInfo?.authors[0];
        this.publisher = response.items[0]?.volumeInfo?.publisher;
      },
      error: err => console.error(err),
      complete: () => {}
    });
  }

  saveBook() {
    // TODO implement saving here
  }
}

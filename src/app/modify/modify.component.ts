import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EditOrAddService} from '../edit-or-add.service';
import {IsbnService} from '../isbn.service';
import { IsbnQuery } from '../objects/IsbnQuery';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { BookService } from '../book.service';
import { Book } from '../objects/Book';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit, AfterViewInit {
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent = new BarcodeScannerLivestreamComponent;

  header: string = 'Loading...'
  bookId: number = -1;
  isbn: string = '';
  editMode: boolean = false;
  title: string | undefined = '';
  author: string | undefined = '';
  publisher: string | undefined = '';
  location: string | undefined = '';
  barcodeValue: string = '';
  message: string = '';
  
  constructor(private editOrAddService: EditOrAddService,
              private isbnService: IsbnService,
              private bookService: BookService) {
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
    this.isbnService.getBook(this.barcodeValue).subscribe({
      next: (response) => {
        console.log(response)
        this.barcodeValue = 'search'
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
    const book: Book = {
        'title': this.title,
        'author': this.author,
        'publisher': this.publisher,
        'location': this.location,
        'stillHave': true
    } as Book;
    
    console.log('Huh');
    this.bookService.saveBook(book).subscribe({
      next: (res) => {
        console.log('Yay!: ', res);
        this.message = 'Success'
        // TODO navigate to the edit page with this
      },
      error: (err) => {
        this.message = 'suck an egg'
        console.error('No :( ', err);
      }
    })
  }
  
  ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  onValueChanges(result: any) {
    this.barcodeValue = result.codeResult.code;
  }

  onStarted(started: any) {
    console.log(started);
  }
}

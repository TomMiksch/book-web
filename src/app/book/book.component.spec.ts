import {createComponentFactory, mockProvider, Spectator} from '@ngneat/spectator';

import {BookComponent} from './book.component';
import {BookService} from '../book.service';
import {of} from 'rxjs';
import {Book} from '../objects/Book';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import Spy = jasmine.Spy;
import {MatTableModule} from '@angular/material/table';

let expectedBook: Book = {
  id: 1,
  title: 'Man Stuff',
  author: 'Jimbo Himbo',
  publisher: 'Gumbo Jumbo'
};

const mockBookService = {
  getAll: () => of([expectedBook])
}

describe('BookComponent', () => {
  let spectator: Spectator<BookComponent>;
  let getAllSpy: Spy;
  const createComponent = createComponentFactory({
    component: BookComponent,
    providers: [mockProvider(BookService, mockBookService)],
    imports: [MatTableModule],
    schemas: [NO_ERRORS_SCHEMA]
  });

  beforeEach(() => {
    getAllSpy = spyOn(mockBookService, 'getAll').and.callThrough();
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have the header', () => {
    expect(spectator.query('h2')).toContainText('In The Library');
  });

  it('should call the backend and get the book list on load', () => {
    expect(getAllSpy).toHaveBeenCalled()
    expect(spectator.component.books).toEqual([expectedBook])
  });

  describe('Book Table', () => {
    it('should display the headers in a table', () => {
      const headers = spectator.queryAll('th');
      expect(headers[0]).toContainText('ID');
      expect(headers[1]).toContainText('Title');
      expect(headers[2]).toContainText('Author');
      expect(headers[3]).toContainText('Publisher');
    });
  });
});
